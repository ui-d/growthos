import { BuilderWizardState } from "./types";

export interface GrowthPreset {
  name: string;
  description: string;
  input: BuilderWizardState;
}

export const GROWTH_PRESETS: GrowthPreset[] = [
  {
    name: "Devtool PLG",
    description: "Product-led growth strategy for developer tools with app deployment workflows",
    input: {
      productType: "Devtool",
      primaryObject: "app",
      valueAction: "deploy",
      pricingModel: "Usage-based",
      ttvMinutes: "5",
      activationEventName: "First Deployment",
      activationRules: ["created_primary_object", "invited_teammate"],
      coreEvents: ["user_signup", "user_login", "object_created", "feature_used"],
      customEvents: ["deployment_completed", "environment_configured", "webhook_connected"]
    }
  },
  {
    name: "B2B SaaS",
    description: "Growth strategy for B2B software with project-based collaboration workflows",
    input: {
      productType: "B2B SaaS",
      primaryObject: "project",
      valueAction: "share",
      pricingModel: "Subscription",
      ttvMinutes: "10",
      activationEventName: "Setup Complete",
      activationRules: ["created_primary_object", "used_key_feature"],
      coreEvents: ["user_signup", "user_login", "object_created", "object_updated", "team_member_invited"],
      customEvents: ["project_shared", "collaboration_started", "export_completed"]
    }
  },
  {
    name: "Content/Analytics Tool",
    description: "Growth strategy for content creation and analytics tools with publishing workflows",
    input: {
      productType: "B2B SaaS",
      primaryObject: "dashboard",
      valueAction: "publish",
      pricingModel: "Hybrid",
      ttvMinutes: "15",
      activationEventName: "First Publish",
      activationRules: ["created_primary_object", "used_key_feature", "connected_integration"],
      coreEvents: ["user_signup", "user_login", "object_created", "feature_used", "integration_connected"],
      customEvents: ["content_published", "analytics_viewed", "report_generated", "data_exported"]
    }
  }
];