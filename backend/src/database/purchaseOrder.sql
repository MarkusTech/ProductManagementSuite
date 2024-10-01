generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model PurchaseOrder {
  poID                 Int       @id @default(autoincrement())
  poNumber             Int       @unique
  supplierID           Int
  orderDate            DateTime  // Use DateTime for date values
  expectedDeliverDate  DateTime  // Use DateTime for date values
  status               Boolean   @default(true)
  locationID           Int
  createdByID          Int
  modifiedByID         Int?
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  // Establish relationships
  supplier             Suppliers  @relation(fields: [supplierID], references: [supplierID])
  location             Locations  @relation(fields: [locationID], references: [locationID])
}

model PurchaseOrderItem {
  poItemID   Int      @id @default(autoincrement())
  poID       Int
  itemID     Int
  uom        String   // Unit of Measure
  unitCost   Float    // Cost per unit
  orderQty   Int      // Quantity ordered
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Establish relationships
  purchaseOrder PurchaseOrder @relation(fields: [poID], references: [poID])
  item          Items         @relation(fields: [itemID], references: [itemID])
}

model poReceivingItem {
  poReceivingItemID Int      @id @default(autoincrement())
  itemID            Int
  uom               String    // Unit of Measure
  receivedQty       Int       // Quantity received
  unitCost          Float     // Cost per unit
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  // Establish relationships
  item              Items      @relation(fields: [itemID], references: [itemID])
}

model poReceiving {
  poReceivingID   Int      @id @default(autoincrement())
  poID            Int      // Reference to the Purchase Order
  receivedDate    DateTime // Date when the items were received
  referenceNumber String    // Reference number for the receiving document
  totalCost       Float     // Total cost of received items
  totalQty        Int       // Total quantity of items received
  status          String     // Status of the receiving
  receivedByID    Int       // ID of the user who received the items
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Establish relationships
  purchaseOrder   PurchaseOrder @relation(fields: [poID], references: [poID])
}

model poSupplier {
  supplierID      Int      @id @default(autoincrement())
  supplierName    String   // Name of the supplier
  contactDetails   String   // Contact details for the supplier
  address         String   // Address of the supplier
  email           String   // Email of the supplier
  createdByID     Int      // ID of the user who created the supplier entry
  modifiedByID    Int?     // ID of the user who last modified the supplier entry
  createdAt       DateTime @default(now()) // Timestamp for when the supplier was created
  updatedAt       DateTime @updatedAt      // Timestamp for when the supplier was last updated
  status          Boolean  @default(true) // Status of the supplier (active/inactive)
}


