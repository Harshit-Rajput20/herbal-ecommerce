-- Step 1: Create tables first
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  stock INTEGER NOT NULL,
  category TEXT DEFAULT 'herbal',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create functions and triggers
CREATE OR REPLACE FUNCTION check_stock()
RETURNS TRIGGER AS $$
DECLARE
  available_stock INTEGER;
BEGIN
  SELECT stock INTO available_stock FROM products WHERE id = NEW.product_id;
  
  IF available_stock < NEW.quantity THEN
    RAISE EXCEPTION 'Not enough stock available for product %', NEW.product_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_stock_before_order
BEFORE INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION check_stock();

CREATE OR REPLACE FUNCTION reduce_stock()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET stock = stock - NEW.quantity
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reduce_stock_after_order
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION reduce_stock();

-- Step 3: Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies
-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products are insertable by admins only"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Products are updatable by admins only"
  ON products FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Products are deletable by admins only"
  ON products FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own pending orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    (user_id = auth.uid() AND status = 'pending') OR 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    (user_id = auth.uid() AND status = 'pending') OR 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Only admins can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Order items policies
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
    )
  );

-- Fixed policy: Don't reference NEW in the USING clause
CREATE POLICY "Users can insert their own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update order items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Only admins can delete order items"
  ON order_items FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Admin users policies
CREATE POLICY "Admin users are viewable by admins only"
  ON admin_users FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Special case for first admin
CREATE POLICY "First admin user can be inserted"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    NOT EXISTS (SELECT 1 FROM admin_users) OR -- Allow if no admin exists yet
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Step 5: Insert initial admin user (optional)
-- Replace 'your-user-id' with an actual user ID from auth.users
-- INSERT INTO admin_users (id, email)
-- SELECT id, email FROM auth.users WHERE id = 'your-user-id';
