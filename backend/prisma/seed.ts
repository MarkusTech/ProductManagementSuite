import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create dummy location
  const location = await prisma.locations.create({
    data: {
      locationName: "Warehouse A",
      description: "Main warehouse location",
      createdByID: 1,
      modifiedByID: 1,
    },
  });

  // Create dummy item
  const item = await prisma.items.create({
    data: {
      itemCode: "ITEM001",
      categoryID: 1, // Assuming a category exists
      barcode: "123456789012",
      itemName: "Product A",
      description: "Sample product",
      grams: 500,
      uom: "kg",
      price: 100.0,
      cost: 80.0,
      createdByID: 1,
    },
  });

  // Create dummy inventory
  const inventory = await prisma.inventory.create({
    data: {
      locationID: location.locationID,
      itemID: item.itemID,
      quantity: 100,
      inventoryTypeID: 1, // Assuming an inventory type exists
      reOrderThreshold: "10",
    },
  });

  console.log("Seed data created:", { location, item, inventory });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
