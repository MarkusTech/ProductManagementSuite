generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")


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
