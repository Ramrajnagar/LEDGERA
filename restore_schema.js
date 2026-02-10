
const fs = require('fs');

const schema = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  // directUrl = env("DIRECT_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      String   @default("OBSERVER") // OBSERVER, CONTROLLER, ADMIN
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  trustScore TrustScore?
}

model Shipment {
  id             String   @id @default(uuid())
  trackingId     String   @unique
  origin         String
  destination    String
  status         String   @default("PENDING") // PENDING, IN_TRANSIT, DELIVERED, HELD, CUSTOMS
  currentLat     Float?
  currentLng     Float?
  estimatedArrival DateTime?
  
  decisions AgentDecision[]
  navPath   Json? // Store route coordinates as JSON
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AgentDecision {
  id           String   @id @default(uuid())
  agentType    String   // LOGISTICS, FINANCE, SECURITY
  action       String
  reason       String
  confidence   Float    @default(0.0)
  
  shipmentId   String
  shipment     Shipment @relation(fields: [shipmentId], references: [id])
  
  createdAt    DateTime @default(now())
}

model EscrowState {
  id             String   @id @default(uuid())
  transactionId  String   @unique
  amount         Float
  currency       String   @default("USD")
  status         String   @default("LOCKED") // LOCKED, RELEASE_PENDING, RELEASED, DISPUTED
  
  conditions     Json     // Conditions required for release
  
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model TrustScore {
  id        String   @id @default(uuid())
  entityId  String   @unique // Can link to User or Organization
  score     Float    @default(50.0)
  trend     String   @default("STABLE") // RISING, FALLING, STABLE
  
  history   Json?    // Array of { date, score }
  
  user      User?    @relation(fields: [entityId], references: [id])
  
  updatedAt DateTime @updatedAt
}
`;

fs.writeFileSync('prisma/schema.prisma', schema, 'utf8');
console.log('Restored schema.prisma with clean UTF-8.');
