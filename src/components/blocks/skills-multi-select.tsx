"use client";

import React from "react";
import CreatableSelect from "react-select/creatable";

export type SkillOption = { value: string; label: string };

interface SkillsMultiSelectProps {
  value: SkillOption[];
  onChange: (value: SkillOption[]) => void;
  placeholder?: string;
}

export default function SkillsMultiSelect({
  value,
  onChange,
  placeholder = "e.g. Javascript",
}: SkillsMultiSelectProps) {
  return (
    <div className="w-full">
      <CreatableSelect
        placeholder={placeholder}
        isMulti
        isClearable={false}
        value={value}
        onChange={(val) => onChange(val as SkillOption[])}
        onCreateOption={(input) => {
          const newSkill = { value: input.toLowerCase(), label: input };
          onChange([...value, newSkill]);
        }}
        options={[
          { value: "sales", label: "Sales & Marketing" },
          { value: "digital-marketing", label: "Digital Marketing" },
          { value: "business-development", label: "Business Development" },
          { value: "project-management", label: "Project Management" },
          { value: "product-management", label: "Product Management" },
          { value: "strategic-planning", label: "Strategic Planning" },
          { value: "operations-management", label: "Operations Management" },
          { value: "supply-chain", label: "Supply Chain" },
          { value: "negotiation", label: "Negotiation" },
          { value: "leadership", label: "Leadership" },
          { value: "team-management", label: "Team Management" },
          { value: "communication", label: "Communication Skills" },
          { value: "presentation", label: "Presentation Skills" },
          { value: "analytical-thinking", label: "Analytical Thinking" },
          { value: "problem-solving", label: "Problem Solving" },
          { value: "public-speaking", label: "Public Speaking" },
          { value: "customer-service", label: "Customer Service" },
          { value: "marketing", label: "Marketing" },
          { value: "marketing-comm", label: "Marketing Communications" },
          { value: "seo", label: "SEO" },
          { value: "sem", label: "SEM" },
          { value: "content-writing", label: "Content Writing" },
          { value: "copywriting", label: "Copywriting" },
          {
            value: "social-media-management",
            label: "Social Media Management",
          },
          { value: "email-marketing", label: "Email Marketing" },
          { value: "brand-management", label: "Brand Management" },
          { value: "content-creation", label: "Content Creation" },
          { value: "video-editing", label: "Video Editing" },
          { value: "graphic-design", label: "Graphic Design" },
          { value: "ui-ux", label: "UI/UX Design" },
          { value: "figma", label: "Figma" },
          { value: "javascript", label: "JavaScript" },
          { value: "typescript", label: "TypeScript" },
          { value: "php", label: "PHP" },
          { value: "java", label: "Java" },
          { value: "python", label: "Python" },
          { value: "go", label: "Golang" },
          { value: "csharp", label: "C#" },
          { value: "cpp", label: "C++" },
          { value: "ruby", label: "Ruby" },
          { value: "nodejs", label: "Node.js" },
          { value: "react", label: "React" },
          { value: "nextjs", label: "Next.js" },
          { value: "vue", label: "Vue.js" },
          { value: "laravel", label: "Laravel" },
          { value: "springboot", label: "Spring Boot" },
          { value: "dotnet", label: ".NET" },
          { value: "data-analysis", label: "Data Analysis" },
          { value: "data-visualization", label: "Data Visualization" },
          { value: "sql", label: "SQL" },
          { value: "mysql", label: "MySQL" },
          { value: "postgresql", label: "PostgreSQL" },
          { value: "powerbi", label: "Power BI" },
          { value: "tableau", label: "Tableau" },
          { value: "excel", label: "Advanced Excel" },
          { value: "machine-learning", label: "Machine Learning" },
          { value: "deep-learning", label: "Deep Learning" },
          { value: "big-data", label: "Big Data" },
          { value: "devops", label: "DevOps" },
          { value: "docker", label: "Docker" },
          { value: "kubernetes", label: "Kubernetes" },
          { value: "aws", label: "AWS" },
          { value: "gcp", label: "Google Cloud" },
          { value: "azure", label: "Azure" },
          { value: "linux", label: "Linux Administration" },
          { value: "ci-cd", label: "CI/CD" },
          { value: "cybersecurity", label: "Cybersecurity" },
          { value: "accounting", label: "Accounting" },
          { value: "auditing", label: "Auditing" },
          { value: "taxation", label: "Taxation" },
          { value: "financial-analysis", label: "Financial Analysis" },
          { value: "budgeting", label: "Budgeting & Forecasting" },
          { value: "financial-reporting", label: "Financial Reporting" },
          { value: "recruitment", label: "Recruitment" },
          { value: "training-development", label: "Training & Development" },
          { value: "payroll", label: "Payroll" },
          { value: "employee-relations", label: "Employee Relations" },
          { value: "office-admin", label: "Office Administration" },
          { value: "photoshop", label: "Photoshop" },
          { value: "illustrator", label: "Illustrator" },
          { value: "after-effects", label: "After Effects" },
          { value: "indesign", label: "InDesign" },
          { value: "canva", label: "Canva" },
          { value: "3d-modeling", label: "3D Modeling" },
          { value: "animation", label: "Animation" },
          { value: "food-beverage", label: "Food & Beverage" },
          { value: "barista", label: "Barista Skills" },
          { value: "chef", label: "Culinary Arts" },
          { value: "front-office", label: "Front Office" },
          { value: "housekeeping", label: "Housekeeping" },
          { value: "hotel-management", label: "Hotel Management" },
          { value: "event-management", label: "Event Management" },
        ]}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "48px",
            borderColor: "#d1d5db",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#9ca3af",
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#e5e7eb",
            borderRadius: "9999px",
            paddingLeft: "6px",
            paddingRight: "6px",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            fontSize: "12px",
            color: "#374151",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#d1d5db",
              color: "#111827",
            },
          }),
        }}
      />
    </div>
  );
}
