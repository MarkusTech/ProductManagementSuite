import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  for (let i = 0; i < 10; i++) {
    await prisma.users.create({
      data: {
        firstName: `FirstName${i + 1}`,
        middleName: `MiddleName${i + 1}`,
        lastName: `LastName${i + 1}`,
        roleID: (i % 5) + 1,
        username: `user${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: `password${i + 1}`,
        phoneNumber: `091234567${i + 1}`,
        address: `Address ${i + 1}`,
        birthday: `199${i}-01-01`,
        status: true,
        image_url: `https://example.com/image${i + 1}.png`,
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
      },
    });
  }

  // Seed Categories
  for (let i = 0; i < 10; i++) {
    await prisma.categories.create({
      data: {
        categoryCode: `CAT${i + 1}`,
        categoryName: `Category Name ${i + 1}`,
        description: `Description for Category ${i + 1}`,
        status: true,
      },
    });
  }

  // Seed Locations
  for (let i = 0; i < 10; i++) {
    await prisma.locations.create({
      data: {
        locationName: `Location ${i + 1}`,
        description: `Description for Location ${i + 1}`,
        status: true,
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
      },
    });
  }

  // Seed Suppliers
  for (let i = 0; i < 10; i++) {
    await prisma.suppliers.create({
      data: {
        supplierName: `Supplier ${i + 1}`,
        description: `Description for Supplier ${i + 1}`,
        status: true,
      },
    });
  }

  // Seed Items
  for (let i = 0; i < 10; i++) {
    await prisma.items.create({
      data: {
        itemCode: `ITEM${i + 1}`,
        categoryID: (i % 5) + 1,
        barcode: `BARCODE${i + 1}`,
        itemName: `Item Name ${i + 1}`,
        description: `Description for Item ${i + 1}`,
        grams: 100 + i,
        uom: `UOM${i + 1}`,
        price: 100 + i * 10,
        cost: 50 + i * 5,
        image_url: `https://example.com/item${i + 1}.png`,
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
        status: true,
      },
    });
  }

  // Seed InventoryType
  for (let i = 0; i < 10; i++) {
    await prisma.inventoryType.create({
      data: {
        typeName: `Inventory Type ${i + 1}`,
        description: `Description for Inventory Type ${i + 1}`,
        status: true,
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
      },
    });
  }

  // Seed Inventory
  for (let i = 0; i < 10; i++) {
    await prisma.inventory.create({
      data: {
        locationID: (i % 5) + 1,
        itemID: (i % 5) + 1,
        quantity: 100 + i * 10,
        inventoryTypeID: (i % 5) + 1,
        reOrderThreshold: `${i * 10}`,
      },
    });
  }

  // Seed InventoryAdjustment
  for (let i = 0; i < 10; i++) {
    await prisma.inventoryAdjustment.create({
      data: {
        inventoryID: (i % 5) + 1,
        adjustmentTypeID: (i % 5) + 1,
        adjustmentReasonID: (i % 5) + 1,
        quantityAdjusted: 5 + i,
        status: "Completed",
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
      },
    });
  }

  // Seed AdjustmentType
  for (let i = 0; i < 10; i++) {
    await prisma.adjustmentType.create({
      data: {
        typeName: `Adjustment Type ${i + 1}`,
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
      },
    });
  }

  // Seed AdjustmentReason
  for (let i = 0; i < 10; i++) {
    await prisma.adjustmentReason.create({
      data: {
        reasonName: `Reason ${i + 1}`,
        createdByID: (i % 3) + 1,
        modifiedByID: (i % 3) + 1,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
