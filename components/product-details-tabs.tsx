"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

type ProductDetailsTabsProps = {
  description: string
  benefits?: string[]
  ingredients?: string[]
  directions?: string
}

export default function ProductDetailsTabs({
  description,
  benefits = [],
  ingredients = [],
  directions = "",
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <Tabs defaultValue="description" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="benefits" disabled={benefits.length === 0}>
          Benefits
        </TabsTrigger>
        <TabsTrigger value="ingredients" disabled={ingredients.length === 0}>
          Ingredients
        </TabsTrigger>
        <TabsTrigger value="directions" disabled={!directions}>
          Directions
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4 text-sm text-muted-foreground">
        <p>{description}</p>
      </TabsContent>

      <TabsContent value="benefits" className="mt-4">
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="ingredients" className="mt-4">
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-sm pl-4 border-l-2 border-primary/20">
              {ingredient}
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="directions" className="mt-4 text-sm">
        <p>{directions}</p>
      </TabsContent>
    </Tabs>
  )
}
