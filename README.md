# ERP - Enterprise Resource Planning

A modern, high-performance enterprise resource planning solution designed for manufacturing and logistics-heavy businesses. Built with Next.js, Radix UI, and Genkit AI.

## Core Features

- **Command Center**: Real-time KPI tracking and interactive financial charts.
- **Supply Chain Management**: End-to-end procurement, raw material tracking, and automated reordering.
- **Manufacturing Engine**: Bill of Materials (BOM) management and real-time production floor monitoring.
- **AI Financial Forecaster**: Intelligent cash flow prediction and proactive procurement scheduling using Genkit.
- **Sales & Distribution**: Quotation management, order lifecycle tracking, and installation scheduling.
- **Role-Based Access (RBAC)**: Fine-grained permissions for executive, management, and operational roles.

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with ShadCN UI
- **AI**: Genkit with Google Gemini
- **Database**: Firebase Firestore (Ready for integration)
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

1. Set up your `.env` with a valid `GEMINI_API_KEY`.
2. Explore the `/dashboard` for the command center.
3. Use the `/reports` module to test the AI Financial Forecaster.
4. Manage system-wide settings in `/configuration`.
