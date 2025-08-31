export const navbarLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Posts", href: "/posts" },
  { id: 4, name: "About", href: "/about" },
];

export const posts: Post[] = [
  {
    id: "1",
    title: "Power BI vs Tableau: Complete Performance Comparison 2024",
    createdAt: new Date("2024-08-15T10:30:00Z"),
    content: `# Power BI vs Tableau: Which BI Tool Rules 2024?

Business Intelligence tools are crucial for modern data-driven organizations. In this comprehensive comparison, we'll explore the key differences between **Power BI** and **Tableau**.

## Performance Benchmarks

| Feature | Power BI | Tableau |
|---------|----------|---------|
| Data Processing Speed | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Visualization Options | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cost Effectiveness | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## Key Findings

- **Power BI** excels in Microsoft ecosystem integration
- **Tableau** offers superior visualization capabilities
- Cost considerations favor Power BI for large deployments

*Learn which tool fits your organization's needs...*`,
    summary:
      "This article compares Power BI and Tableau across performance, cost, and visualization capabilities. Power BI shines in Microsoft ecosystem integration and affordability, while Tableau excels in advanced visualization options. The choice ultimately depends on organizational needs and budget.",
    published: true,
    author: {
      id: "1",
      name: "Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
  },
  {
    id: "2",
    title: "Modern ETL Pipeline Architecture with Apache Airflow",
    createdAt: new Date("2024-08-12T14:20:00Z"),
    content: `# Building Robust ETL Pipelines with Apache Airflow

Extract, Transform, Load (ETL) processes form the backbone of modern data architecture. **Apache Airflow** has emerged as the leading orchestration platform.

## Pipeline Components

\`\`\`python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def extract_data():
    # Extract logic here
    pass

dag = DAG(
    'data_pipeline',
    default_args={'retries': 2},
    schedule_interval='@daily'
)
\`\`\`

## Best Practices

1. **Idempotent Operations** - Ensure tasks can be safely re-run
2. **Monitoring & Alerting** - Set up comprehensive logging
3. **Resource Management** - Optimize memory and CPU usage

Transform your data workflows with these proven strategies...`,
    summary:
      "This post explores how Apache Airflow powers modern ETL pipelines. It highlights key components, best practices like idempotent operations and monitoring, and resource optimization. Airflow enables scalable, reliable data workflows for complex architectures.",
    published: true,
    author: {
      id: "2",
      name: "Marcus Rodriguez",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  },
  {
    id: "3",
    title: "Database Optimization: PostgreSQL vs MySQL Performance Tuning",
    createdAt: new Date("2024-08-10T09:15:00Z"),
    content: `# Database Performance: PostgreSQL vs MySQL Optimization Guide

Database performance directly impacts application speed and user experience. Let's dive into optimization techniques for both **PostgreSQL** and **MySQL**.

## Indexing Strategies

### PostgreSQL B-Tree Indexes
\`\`\`sql
CREATE INDEX CONCURRENTLY idx_user_email 
ON users USING btree (email);

-- Partial indexes for better performance
CREATE INDEX idx_active_users 
ON users (created_at) WHERE status = 'active';
\`\`\`

### MySQL Optimization
\`\`\`sql
-- Composite indexes
ALTER TABLE orders 
ADD INDEX idx_user_date (user_id, order_date);

-- Query optimization
EXPLAIN SELECT * FROM orders 
WHERE user_id = 123 AND order_date > '2024-01-01';
\`\`\`

## Performance Metrics

- **Query execution time** reduced by 75%
- **Index utilization** improved significantly
- **Memory usage** optimized for concurrent connections

*Discover advanced tuning techniques...*`,
    summary:
      "This guide compares performance tuning in PostgreSQL and MySQL. It discusses indexing strategies, query optimization, and memory management techniques. Practical examples show how optimization can drastically improve query speed and efficiency.",
    published: true,
    author: {
      id: "3",
      name: "Emma Thompson",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  },
  {
    id: "4",
    title: "Real-time Analytics with Apache Kafka and ClickHouse",
    createdAt: new Date("2024-08-08T16:45:00Z"),
    content: `# Building Real-time Analytics: Kafka + ClickHouse Integration

Real-time data processing is essential for modern applications. Combining **Apache Kafka** with **ClickHouse** creates a powerful analytics stack.

## Architecture Overview

\`\`\`mermaid
graph LR
    A[Data Sources] --> B[Kafka]
    B --> C[Stream Processing]
    C --> D[ClickHouse]
    D --> E[Analytics Dashboard]
\`\`\`

## ClickHouse Configuration

\`\`\`xml
<kafka>
    <bootstrap_servers>localhost:9092</bootstrap_servers>
    <topics>
        <topic>user_events</topic>
        <topic>system_metrics</topic>
    </topics>
</kafka>
\`\`\`

## Performance Benefits

- **Sub-second query responses** on billions of rows
- **Horizontal scaling** with distributed tables
- **Cost-effective** compared to traditional OLAP solutions

## Use Cases

1. **E-commerce Analytics** - Real-time sales monitoring
2. **IoT Data Processing** - Sensor data aggregation  
3. **Financial Services** - Fraud detection systems

*Implement enterprise-grade real-time analytics...*`,
    summary:
      "This article shows how Kafka and ClickHouse can be combined to deliver real-time analytics. It covers architecture, configuration, and use cases like e-commerce and IoT. The integration enables sub-second queries and scalable, cost-effective analytics.",
    published: true,
    author: {
      id: "4",
      name: "David Kim",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  },
  {
    id: "5",
    title: "Data Warehouse Design: Snowflake vs BigQuery Cost Analysis",
    createdAt: new Date("2024-08-05T11:30:00Z"),
    content: `# Cloud Data Warehouse Showdown: Snowflake vs BigQuery

Choosing the right cloud data warehouse impacts both performance and budget. We analyzed **Snowflake** and **Google BigQuery** across multiple dimensions.

## Cost Comparison (Monthly)

| Workload Type | Snowflake | BigQuery | Savings |
|---------------|-----------|----------|---------|
| Batch Processing | $2,400 | $1,800 | 25% |
| Interactive Queries | $1,200 | $900 | 25% |
| Storage (1TB) | $45 | $20 | 56% |

## Architecture Differences

### Snowflake
- **Multi-cluster** shared data architecture
- **Automatic scaling** based on concurrency
- **Time travel** up to 90 days

### BigQuery
- **Serverless** architecture
- **Columnar storage** with automatic optimization
- **ML integration** with BigQuery ML

## Migration Strategies

\`\`\`sql
-- BigQuery partitioning
CREATE TABLE analytics.user_events
PARTITION BY DATE(event_timestamp)
CLUSTER BY user_id, event_type
AS SELECT * FROM source_table;
\`\`\`

*Make informed decisions for your data platform...*`,
    summary:
      "This post compares Snowflake and BigQuery with a focus on cost and architecture. It provides a detailed breakdown of monthly expenses, scaling features, and migration strategies. Readers gain insights into which warehouse offers better value for specific workloads.",
    published: true,
    author: {
      id: "5",
      name: "Lisa Zhang",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
  },
  {
    id: "6",
    title: "Data Lake Architecture: AWS S3 + Glue vs Azure Data Lake",
    createdAt: new Date("2024-08-02T13:25:00Z"),
    content: `# Data Lake Platforms: AWS vs Azure Architecture Comparison

Modern data lakes serve as the foundation for analytics and machine learning. Let's compare **AWS S3 + Glue** with **Azure Data Lake Storage**.

## AWS Data Lake Stack

\`\`\`yaml
# AWS Glue ETL Job
Resources:
  DataLakeETL:
    Type: AWS::Glue::Job
    Properties:
      Role: !Ref GlueRole
      Command:
        Name: glueetl
        ScriptLocation: s3://my-bucket/scripts/etl.py
      DefaultArguments:
        "--source-path": "s3://raw-data/"
        "--target-path": "s3://processed-data/"
\`\`\`

## Azure Implementation

\`\`\`python
# Azure Data Factory Pipeline
from azure.identity import DefaultAzureCredential
from azure.mgmt.datafactory import DataFactoryManagementClient

# Configure data pipeline
pipeline_resource = {
    "activities": [{
        "name": "CopyActivity",
        "type": "Copy",
        "source": {"type": "BlobSource"},
        "sink": {"type": "AzureDataLakeStoreSink"}
    }]
}
\`\`\`

## Feature Comparison

### AWS Advantages
- **Mature ecosystem** with extensive third-party integrations
- **Cost optimization** through Intelligent Tiering
- **Lambda integration** for serverless processing

### Azure Advantages  
- **Enterprise integration** with Microsoft ecosystem
- **Unified security** model across services
- **Synapse Analytics** integration

## Performance Benchmarks
- **Data ingestion**: AWS S3 handles 3,500 PUT/COPY/POST/DELETE per second
- **Query performance**: Azure achieves 20% faster analytics queries
- **Cost efficiency**: Varies by usage pattern and region

*Choose the right platform for your data strategy...*`,
    summary:
      "This article compares AWS S3 + Glue with Azure Data Lake for building data lakes. It highlights strengths like AWS’s ecosystem and Azure’s enterprise integration. Performance, cost, and architecture considerations are discussed to guide platform choice.",
    published: true,
    author: {
      id: "1",
      name: "Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
  },
];
