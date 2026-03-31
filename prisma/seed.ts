import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
    // Categories
    const electronics = await prisma.category.create({ data: { name: "Electronics" } });
    const books = await prisma.category.create({ data: { name: "Books" } });
    const home = await prisma.category.create({ data: { name: "Home & Kitchen" } });
    const fitness = await prisma.category.create({ data: { name: "Fitness" } });
    const gaming = await prisma.category.create({ data: { name: "Gaming" } });
    const beauty = await prisma.category.create({ data: { name: "Beauty" } });


    //  Products

    const laptop = await prisma.product.create({
        data: { name: "Laptop", price: 1200, stock: 30, categoryId: electronics.id },
    });

    const smartphone = await prisma.product.create({
        data: { name: "Smartphone", price: 800, stock: 50, categoryId: electronics.id },
    });

    const novel = await prisma.product.create({
        data: { name: "Mystery Novel", price: 149, stock: 100, categoryId: books.id },
    });

    const cookbook = await prisma.product.create({
        data: { name: "Cookbook", price: 199, stock: 80, categoryId: books.id },
    });

    const blender = await prisma.product.create({
        data: { name: "Blender", price: 899, stock: 20, categoryId: home.id },
    });

    const vacuum = await prisma.product.create({
        data: { name: "Vacuum Cleaner", price: 1500, stock: 15, categoryId: home.id },
    });

    const dumbbells = await prisma.product.create({
        data: { name: "Dumbbells Set", price: 499, stock: 40, categoryId: fitness.id },
    });

    const yogaBook = await prisma.product.create({
        data: { name: "Yoga Book", price: 199, stock: 60, categoryId: books.id },
    });

    const gamingConsole = await prisma.product.create({
        data: { name: "Gaming Console", price: 5000, stock: 10, categoryId: gaming.id },
    });

    const controller = await prisma.product.create({
        data: { name: "Game Controller", price: 699, stock: 25, categoryId: gaming.id },
    });

    const lipstick = await prisma.product.create({
        data: { name: "Lipstick", price: 149, stock: 100, categoryId: beauty.id },
    });

    const skincare = await prisma.product.create({
        data: { name: "Face Cream", price: 299, stock: 80, categoryId: beauty.id },
    });


    // Customers-
    const anna = await prisma.customer.create({
        data: { name: "Anna Svensson", email: "anna.svensson@test.com" },
    });

    const leo = await prisma.customer.create({
        data: { name: "Leo Andersson", email: "leo.andersson@test.com" },
    });

    const maya = await prisma.customer.create({
        data: { name: "Maya Patel", email: "maya.patel@test.com" },
    });

    const noah = await prisma.customer.create({
        data: { name: "Noah Berg", email: "noah.berg@test.com" },
    });



    // Orders + Items

    // Order 1 (Anna)
    const order1 = await prisma.order.create({
        data: { customerId: anna.id },
    });

    await prisma.orderItem.createMany({
        data: [
            { orderId: order1.id, productId: blender.id, quantity: 1 },
            { orderId: order1.id, productId: lipstick.id, quantity: 2 },
        ],
    });

    // Order 2 (Leo)
    const order2 = await prisma.order.create({
        data: { customerId: leo.id },
    });

    await prisma.orderItem.createMany({
        data: [
            { orderId: order2.id, productId: gamingConsole.id, quantity: 1 },
            { orderId: order2.id, productId: controller.id, quantity: 2 },
        ],
    });

    // Order 3 (Maya)
    const order3 = await prisma.order.create({
        data: { customerId: maya.id },
    });

    await prisma.orderItem.createMany({
        data: [
            { orderId: order3.id, productId: yogaBook.id, quantity: 3 },
            { orderId: order3.id, productId: dumbbells.id, quantity: 1 },
        ],
    });

    // Order 4 (Noah)
    const order4 = await prisma.order.create({
        data: { customerId: noah.id },
    });

    await prisma.orderItem.createMany({
        data: [
            { orderId: order4.id, productId: vacuum.id, quantity: 1 },
            { orderId: order4.id, productId: skincare.id, quantity: 2 },
        ],
    });

    console.log("Mock dataset inserted");
}

seed() 
  .catch((e) => { console.error(e); process.exit(1); }) 
  .finally(async () => { await prisma.$disconnect(); }); 