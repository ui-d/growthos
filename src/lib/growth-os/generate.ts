export interface GrowthSpecInput {
  companyName?: string;
  northStarMetric?: {
    name: string;
    description: string;
    formula?: string;
  };
  activationRate?: {
    name: string;
    description: string;
    formula?: string;
  };
  timeToValue?: {
    value: string;
    unit: string;
    description?: string;
  };
  guardrails?: Array<{
    name: string;
    threshold: string;
    description?: string;
  }>;
  activationDefinition?: {
    event: string;
    rules: string[];
    formula: string;
  };
  coreEvents?: Array<{
    name: string;
    description: string;
    trigger?: string;
  }>;
  propertyDictionary?: Array<{
    property: string;
    type: string;
    description: string;
    example?: string;
  }>;
  dashboardPack?: string[];
  experimentExample?: {
    hypothesis: string;
    metric: string;
    duration: string;
    audience: string;
    variants: string[];
    successCriteria: string;
  };
}

export interface GrowthSpecOutput {
  markdown: string;
  data: GrowthSpecInput;
}

export function generateGrowthSpec(input: GrowthSpecInput): GrowthSpecOutput {
  const sections: string[] = [];

  // Title
  sections.push('# Growth OS v0.1');
  sections.push('');

  if (input.companyName) {
    sections.push(`**Company:** ${input.companyName}`);
    sections.push('');
  }

  // KPI Tree
  sections.push('## KPI Tree');
  sections.push('');

  if (input.northStarMetric) {
    sections.push('### North Star Metric');
    sections.push(`**${input.northStarMetric.name}**`);
    sections.push(`- Description: ${input.northStarMetric.description}`);
    if (input.northStarMetric.formula) {
      sections.push(`- Formula: \`${input.northStarMetric.formula}\``);
    }
    sections.push('');
  }

  if (input.activationRate) {
    sections.push('### Activation Rate');
    sections.push(`**${input.activationRate.name}**`);
    sections.push(`- Description: ${input.activationRate.description}`);
    if (input.activationRate.formula) {
      sections.push(`- Formula: \`${input.activationRate.formula}\``);
    }
    sections.push('');
  }

  if (input.timeToValue) {
    sections.push('### Time to Value');
    sections.push(`**${input.timeToValue.value} ${input.timeToValue.unit}**`);
    if (input.timeToValue.description) {
      sections.push(`- ${input.timeToValue.description}`);
    }
    sections.push('');
  }

  if (input.guardrails && input.guardrails.length > 0) {
    sections.push('### Guardrails');
    input.guardrails.forEach(guardrail => {
      sections.push(`- **${guardrail.name}**: ${guardrail.threshold}`);
      if (guardrail.description) {
        sections.push(`  - ${guardrail.description}`);
      }
    });
    sections.push('');
  }

  // Activation Definition
  if (input.activationDefinition) {
    sections.push('## Activation Definition');
    sections.push('');
    sections.push(`**Event:** ${input.activationDefinition.event}`);
    sections.push('');
    sections.push('**Rules:**');
    input.activationDefinition.rules.forEach(rule => {
      sections.push(`- ${rule}`);
    });
    sections.push('');
    sections.push(`**Formula:** \`${input.activationDefinition.formula}\``);
    sections.push('');
  }

  // Core Events
  if (input.coreEvents && input.coreEvents.length > 0) {
    sections.push('## Core Events');
    sections.push('');
    input.coreEvents.forEach(event => {
      sections.push(`### ${event.name}`);
      sections.push(`- **Description:** ${event.description}`);
      if (event.trigger) {
        sections.push(`- **Trigger:** ${event.trigger}`);
      }
      sections.push('');
    });
  }

  // Property Dictionary
  if (input.propertyDictionary && input.propertyDictionary.length > 0) {
    sections.push('## Property Dictionary');
    sections.push('');
    sections.push('| Property | Type | Description | Example |');
    sections.push('|----------|------|-------------|---------|');
    input.propertyDictionary.forEach(prop => {
      const example = prop.example || '-';
      sections.push(`| ${prop.property} | ${prop.type} | ${prop.description} | ${example} |`);
    });
    sections.push('');
  }

  // Dashboard Pack
  if (input.dashboardPack && input.dashboardPack.length > 0) {
    sections.push('## Dashboard Pack');
    sections.push('');
    input.dashboardPack.forEach(item => {
      sections.push(`- ${item}`);
    });
    sections.push('');
  }

  // Experiment Card
  if (input.experimentExample) {
    sections.push('## Experiment Card (Example)');
    sections.push('');
    sections.push(`**Hypothesis:** ${input.experimentExample.hypothesis}`);
    sections.push('');
    sections.push(`**Primary Metric:** ${input.experimentExample.metric}`);
    sections.push('');
    sections.push(`**Duration:** ${input.experimentExample.duration}`);
    sections.push('');
    sections.push(`**Audience:** ${input.experimentExample.audience}`);
    sections.push('');
    sections.push('**Variants:**');
    input.experimentExample.variants.forEach(variant => {
      sections.push(`- ${variant}`);
    });
    sections.push('');
    sections.push(`**Success Criteria:** ${input.experimentExample.successCriteria}`);
    sections.push('');
  }

  // Footer
  sections.push('---');
  sections.push('');
  sections.push(`*Generated on ${new Date().toISOString().split('T')[0]} using Growth OS Builder*`);

  const markdown = sections.join('\n');

  return {
    markdown,
    data: input
  };
}