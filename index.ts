import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create a product (req.body) 
app.post("/products", async (req, res) => { 
  try { 
    const newProduct = await prisma.product.create({ data: req.body }); 
    res.json(newProduct); 
  } catch (error) { 
    res.status(500).send(error instanceof Error ? error.message : "Unknown error"); } 
}); 
 

// Get products with query filters (req.query) 
// Examples: 
// /products?category=Electronics 
// /products?minPrice=10&maxPrice=100 

app.get("/", (req, res) => {
  res.send("API is working fine");
});


app.get("/products", async (req, res) => { 
  try { 
    const { category, minPrice, maxPrice } = req.query; 
    const products = await prisma.product.findMany({ 
      where: { 
        price: { 
          gte: minPrice ? Number(minPrice) : undefined, 
          lte: maxPrice ? Number(maxPrice) : undefined 
        }, 
        category: category ? { name: { equals: String(category) } } : undefined 
      }, 
      include: { category: true } 
    }); 
    res.json(products); 
  } catch (error) { res.status(500).send(error instanceof Error ? error.message : "Unknown error"); } 
}); 
 


// Update product by id (req.params) 
app.patch("/products/:productId", async (req, res) => {
  try {
    const id = Number(req.params.productId);
    const { name, price, stock, categoryId } = req.body;
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock,
        categoryId,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Unknown error");
  }
});
 


// Delete order by id (req.params)-
app.delete("/orders/:orderId", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);

    // delete related order items first (avoid FK error)
    await prisma.orderItem.deleteMany({
      where: { orderId },
    });
    await prisma.order.delete({
      where: { id: orderId },
    });

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});


app.listen(3000, () => {
    console.log("Server running on 3000");
}); 