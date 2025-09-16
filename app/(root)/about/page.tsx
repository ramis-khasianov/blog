import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const About = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-100 dark:text-light-900">
            About <span className="text-primary-gradient">Raports Blog</span>
          </h1>
          <p className="text-lg text-dark-300 dark:text-light-700 max-w-2xl mx-auto">
            Your comprehensive resource for data management, business
            intelligence, and modern analytics solutions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-light-900 dark:bg-dark-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-dark-100 dark:text-light-900 mb-4">
            Our Mission
          </h2>
          <p className="text-dark-300 dark:text-light-700 leading-relaxed">
            Raports Blog is dedicated to helping data professionals, analysts,
            and engineers navigate the complex world of data management. We
            provide practical insights, tool comparisons, and expert guidance to
            help you make informed decisions about your data infrastructure and
            analytics platforms.
          </p>
        </div>

        {/* What We Cover Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-dark-100 dark:text-light-900">
            What We Cover
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-light-900 dark:bg-dark-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-dark-100 dark:text-light-900 mb-3">
                Database Management
              </h3>
              <p className="text-dark-300 dark:text-light-700">
                From traditional relational databases to modern NoSQL solutions,
                we explore optimization techniques, performance tuning, and best
                practices for database administration.
              </p>
            </div>

            <div className="bg-light-900 dark:bg-dark-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-dark-100 dark:text-light-900 mb-3">
                Business Intelligence
              </h3>
              <p className="text-dark-300 dark:text-light-700">
                Discover the latest BI tools, dashboard design principles, and
                strategies for transforming raw data into actionable business
                insights.
              </p>
            </div>

            <div className="bg-light-900 dark:bg-dark-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-dark-100 dark:text-light-900 mb-3">
                ETL & Data Integration
              </h3>
              <p className="text-dark-300 dark:text-light-700">
                Learn about modern ETL processes, data pipelines, and
                integration patterns that ensure clean, reliable data flows
                across your organization.
              </p>
            </div>

            <div className="bg-light-900 dark:bg-dark-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-dark-100 dark:text-light-900 mb-3">
                Analytics Platforms
              </h3>
              <p className="text-dark-300 dark:text-light-700">
                Compare and evaluate the latest analytics platforms, from
                cloud-based solutions to on-premise deployments, helping you
                choose the right fit.
              </p>
            </div>
          </div>
        </div>

        {/* Who We're For Section */}
        <div className="bg-light-900 dark:bg-dark-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-dark-100 dark:text-light-900 mb-4">
            Who We&apos;re For
          </h2>
          <div className="space-y-3 text-dark-300 dark:text-light-700">
            <p>
              • <strong>Data Engineers</strong> seeking best practices for
              building robust data pipelines
            </p>
            <p>
              • <strong>Database Administrators</strong> looking to optimize
              performance and reliability
            </p>
            <p>
              • <strong>Business Analysts</strong> wanting to leverage modern BI
              tools effectively
            </p>
            <p>
              • <strong>Data Scientists</strong> needing reliable data
              infrastructure for their projects
            </p>
            <p>
              • <strong>IT Decision Makers</strong> evaluating data management
              solutions for their organizations
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6 py-8">
          <h2 className="text-2xl font-semibold text-dark-100 dark:text-light-900">
            Share Your Expertise
          </h2>
          <p className="text-dark-300 dark:text-light-700 max-w-2xl mx-auto">
            Have insights about data management, BI tools, or ETL processes?
            Join our community of data professionals and share your knowledge
            with fellow experts.
          </p>
          <Button
            className="primary-gradient min-h-[46px] px-6 py-3 !text-light-900"
            asChild
          >
            <Link href={ROUTES.NEW_POST}>Write a New Post</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
