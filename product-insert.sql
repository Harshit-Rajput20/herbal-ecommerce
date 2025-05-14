-- Insert the herbal products into the database
INSERT INTO products (name, description, price, image_url, stock, category, featured)
VALUES 
-- Product 1: Instant Herbal Tea Premix
('Instant Herbal Tea Premix', 'Instant Herbal Tea Premix is a powerful blend of 20 carefully selected Ayurvedic herbs and botanicals, offering a soothing, refreshing, and health-boosting experience with every sip. Completely caffeine-free, this herbal infusion is an ideal companion for daily wellness, immunity building, and holistic healing.', 
19.99, '/images/herbal-tea-premix.jpg', 50, 'tea', true),

-- Product 2: Lemon Tea Premix
('Lemon Tea Premix', 'Lemon Tea is a refreshing, zesty, and revitalizing herbal blend that combines the cleansing power of lemon, the antioxidant richness of green tea, and the natural sweetness of date sugar. Crafted with pure, preservative-free ingredients, this tea helps cleanse the body, support metabolism, and improve overall vitality.',
17.99, '/images/lemon-tea-premix.jpg', 45, 'tea', true),

-- Product 3: Women's Health Supplement
('Women\'s Health Supplement', 'Women\'s Health Supplement is a thoughtfully formulated all-in-one herbal supplement developed to meet the specific health needs of modern women. Merging the wisdom of Ayurveda with modern nutritional science, it empowers women through every phase of life — from menstruation to motherhood to menopause.',
29.99, '/images/womens-health-supplement.jpg', 40, 'supplements', true),

-- Product 4: Men's Health Supplement
('Men\'s Health Supplement', 'Men\'s Health Supplement is a scientifically inspired, Ayurvedically rooted men\'s nutritional supplement tailored to elevate strength, energy, endurance, and overall male wellness. Crafted with a robust blend of ancient adaptogens, protein-rich grains, seeds, and essential micronutrients.',
29.99, '/images/mens-health-supplement.jpg', 40, 'supplements', false),

-- Product 5: Kid's Health Supplement
('Kid\'s Health Supplement', 'Kid\'s Health Supplement is a delicious, power-packed nutritional powder specially formulated to meet the growing needs of children aged 2 and above. Blending wholesome grains, seeds, nuts, and cocoa with essential proteins and minerals, it ensures your little ones receive the energy, strength, and nourishment they need.',
24.99, '/images/kids-health-supplement.jpg', 35, 'supplements', false),

-- Product 6: Brain Eye Booster Supplement
('Brain Eye Booster Supplement', 'Brain Eye Booster is a scientifically crafted formulation designed to enhance brain performance, relieve migraines, and support vision health. Packed with nutrient-dense seeds, herbs, and healthy fats, it naturally boosts mental clarity, memory, and overall neurological function.',
32.99, '/images/brain-eye-booster.jpg', 30, 'supplements', true),

-- Product 7: Liver Syrup
('Liver Syrup', 'Liver Syrup is a powerful Ayurvedic formulation designed to restore and rejuvenate liver function. This natural blend of potent herbs like Kutki, Kasni, Punarnava, and Bhringraj works synergistically to detoxify the liver, support fat metabolism, and protect against liver damage.',
22.99, '/images/liver-syrup.jpg', 25, 'syrups', false),

-- Product 8: Ortho Tablet
('Ortho Tablet', 'Ortho Tablets are uniquely formulated to support individuals dealing with orthopedic conditions, post-menopausal bone loss, osteoporosis, joint discomfort, and post-surgery recovery. Crafted with a time-tested Ayurvedic blend, this herbal supplement promotes joint flexibility.',
18.99, '/images/ortho-tablet.jpg', 40, 'tablets', false),

-- Product 9: Liver Care Tablets
('Liver Care Tablets', 'Liver Care Tablets are a powerful blend of time-tested Ayurvedic herbs and scientifically backed nutraceuticals, designed to support optimal liver function, promote detoxification, and assist in the recovery from liver-related concerns like fatty liver, hepatitis, cirrhosis, and alcoholic liver damage.',
21.99, '/images/liver-care-tablets.jpg', 35, 'tablets', false),

-- Product 10: Piles Relief Tablets
('Piles Relief Tablets', 'Piles Relief Tablets are formulated using traditional Ayurvedic wisdom to target the root causes and symptoms of hemorrhoids (piles), both internal and external. This herbal blend provides soothing relief from pain, itching, and bleeding, and helps in shrinking the piles mass naturally.',
19.99, '/images/piles-relief-tablets.jpg', 30, 'tablets', false),

-- Product 11: Kidney Stone Relief Tablets
('Kidney Stone Relief Tablets', 'Kidney Stone Dissolution Tablets combine the wisdom of traditional Ayurvedic herbs to effectively target and address the root causes of kidney stones. This herbal formulation helps break down and dissolve kidney stones, providing relief from the pain, burning sensation, and discomfort associated with the condition.',
23.99, '/images/kidney-stone-tablets.jpg', 25, 'tablets', false),

-- Product 12: Heart Health Drops
('Heart Health Drops', 'HEART HEALTH Drops are meticulously formulated to promote heart health and enhance circulation. This powerful blend of natural extracts—Sesame, Ginseng, Garlic, Amla, and Flaxseed—works synergistically to regulate blood pressure, lower cholesterol, and reduce the risk of arterial plaque formation.',
27.99, '/images/heart-health-drops.jpg', 20, 'drops', true),

-- Product 13: Curcumin Drops
('Curcumin Drops', 'Crafted with the highest quality ingredients, Turmeric Walnut Drops deliver a potent 80% Curcuminoid concentration for maximum health benefits. Enhanced with Piperine for optimal absorption, this formula ensures that every molecule is fully utilized, allowing you to experience the complete spectrum of health advantages in every dose.',
25.99, '/images/curcumin-drops.jpg', 30, 'drops', false),

-- Product 14: Pain Relief Roll-On
('Pain Relief Roll-On', 'Our Muscle & Joint Pain Relief Roll-On is expertly crafted to provide fast and effective relief from muscle soreness, joint discomfort, and body pain. Infused with a powerful blend of natural essential oils like Wintergreen Oil, Turpentine Oil, Ginger Oil, Garlic Oil, and more, this roll-on formula targets pain at the source.',
15.99, '/images/pain-relief-roll-on.jpg', 40, 'topicals', false),

-- Product 15: Aqua Face Wash
('Aqua Face Wash', 'Our Face Wash is formulated with a blend of natural ingredients like Aloe Vera Gel, Honey, Coconut Oil, and Green Tea Extract to provide a deep cleanse while hydrating and nourishing your skin. This refreshing formula gently removes dirt, impurities, and excess oil, leaving your skin feeling fresh, revitalized, and smooth.',
14.99, '/images/aqua-face-wash.jpg', 45, 'skincare', true),

-- Product 16: Hair Wash
('Hair Wash', 'Enriched with time-tested Ayurvedic herbs like Sapindus mukorossi (Reetha), Amla, Shikakai, and Jatamansi, this herbal Hair Wash gently cleanses the scalp, strengthens roots, and promotes thicker, shinier, and healthier hair. It is a natural solution to reduce hair fall, fight dandruff, and restore scalp balance.',
16.99, '/images/hair-wash.jpg', 40, 'haircare', false),

-- Product 17: Hair Oil
('Hair Oil', 'Formulated with a powerful fusion of Ayurvedic herbs and nourishing oils, this Herbal Hair Oil penetrates deep into the scalp to promote healthy hair growth, prevent hair fall, reduce dandruff, and strengthen the roots. Ingredients like Jatamansi, Bhringraj, Amla, and Hibiscus help rejuvenate hair follicles.',
18.99, '/images/hair-oil.jpg', 35, 'haircare', true);
