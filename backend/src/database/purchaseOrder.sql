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
  orderDate            DateTime
  expectedDeliverDate  DateTime
  status               String
  locationID           Int
  createdByID          Int
  modifiedByID         Int?
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
}

model PurchaseOrderItem {
  poItemID   Int      @id @default(autoincrement())
  poID       Int
  itemID     Int
  uom        String
  unitCost   Float 
  orderQty   Int 
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model poReceivingItem {
  poReceivingItemID Int      @id @default(autoincrement())
  itemID            Int
  uom               String    
  receivedQty       Int      
  unitCost          Float 
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  // Establish relationships
  item              Items      @relation(fields: [itemID], references: [itemID])
}

model poReceiving {
  poReceivingID   Int      @id @default(autoincrement())
  poID            Int    
  receivedDate    DateTime
  referenceNumber String
  totalCost       Float
  totalQty        Int
  status          String
  receivedByID    Int
  createdAt       DateTime
  updatedAt       DateTime
}

model poSupplier {
  supplierID      Int      @id @default(autoincrement())
  supplierName    String  
  contactDetails   String  
  address         String   
  email           String   
  createdByID     Int     
  modifiedByID    Int?    
  createdAt       DateTime @default(now()) 
  updatedAt       DateTime @updatedAt     
  status          Boolean  @default(true) 
}


