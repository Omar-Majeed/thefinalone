import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { EMAIL_BRAND } from "./brand";

export interface NewLeadNotificationProps {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  /** Pre-formatted, human-readable submission timestamp. */
  submittedAt: string;
}

const { colors, fontStack } = EMAIL_BRAND;

export function NewLeadNotification({
  name,
  email,
  company,
  projectType,
  message,
  submittedAt,
}: NewLeadNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New project inquiry from ${name} — ${projectType}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandMark}>{EMAIL_BRAND.name.toUpperCase()}</Text>
            <Text style={brandTagline}>{EMAIL_BRAND.tagline}</Text>
          </Section>

          {/* Hero card */}
          <Section style={heroCard}>
            <Text style={pill}>NEW INQUIRY RECEIVED</Text>
            <Heading style={heroHeading}>{projectType}</Heading>
            <Text style={heroSub}>
              A new project inquiry just landed. Details are below — reply
              directly to this email to respond to the client.
            </Text>
          </Section>

          {/* Details card */}
          <Section style={detailsCard}>
            <DetailRow label="Name" value={name} />
            <DetailRow
              label="Email"
              value={
                <Link href={`mailto:${email}`} style={detailLink}>
                  {email}
                </Link>
              }
            />
            <DetailRow label="Company" value={company || "—"} />
            <DetailRow label="Project Type" value={projectType} />
            <DetailRow label="Submitted" value={submittedAt} isLast />
          </Section>

          {/* Message card */}
          <Section style={messageCard}>
            <Text style={messageLabel}>MESSAGE</Text>
            <Text style={messageBody}>{message}</Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section>
            <Text style={footerText}>
              This notification was generated automatically by the{" "}
              {EMAIL_BRAND.name} website.
            </Text>
            <Text style={footerMeta}>
              <Link href={`mailto:${EMAIL_BRAND.contactEmail}`} style={footerLink}>
                {EMAIL_BRAND.contactEmail}
              </Link>
              {"  ·  "}
              <Link href={EMAIL_BRAND.url} style={footerLink}>
                {EMAIL_BRAND.domain}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NewLeadNotification.PreviewProps = {
  name: "Jordan Avery",
  email: "jordan@acme.com",
  company: "Acme Industries",
  projectType: "Web Development",
  message:
    "We're planning a complete rebuild of our marketing site and would love to talk about timelines, scope, and an initial audit. Ideally launching in Q3.",
  submittedAt: "June 9, 2026 at 2:14 PM (UTC)",
} satisfies NewLeadNotificationProps;

export default NewLeadNotification;

/* ── Sub-components ── */

function DetailRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <Row style={isLast ? detailRowLast : detailRow}>
      <Column style={detailLabelCol}>
        <Text style={detailLabel}>{label}</Text>
      </Column>
      <Column>
        <Text style={detailValue}>{value}</Text>
      </Column>
    </Row>
  );
}

/* ── Styles ── */

const body: React.CSSProperties = {
  margin: 0,
  padding: "32px 0",
  backgroundColor: colors.background,
  fontFamily: fontStack,
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 24px",
};

const header: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "24px",
};

const brandMark: React.CSSProperties = {
  margin: 0,
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "0.32em",
  color: colors.white,
};

const brandTagline: React.CSSProperties = {
  margin: "6px 0 0",
  fontSize: "12px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: colors.accent,
};

const heroCard: React.CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  padding: "28px",
  marginBottom: "16px",
};

const pill: React.CSSProperties = {
  display: "inline-block",
  margin: "0 0 14px",
  padding: "5px 12px",
  backgroundColor: colors.accentSoft,
  border: `1px solid ${colors.borderStrong}`,
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  color: colors.accent,
};

const heroHeading: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "26px",
  lineHeight: "1.2",
  fontWeight: 700,
  color: colors.heading,
};

const heroSub: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "1.6",
  color: colors.textMuted,
};

const detailsCard: React.CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  padding: "8px 24px",
  marginBottom: "16px",
};

const detailRow: React.CSSProperties = {
  borderBottom: `1px solid ${colors.border}`,
};

const detailRowLast: React.CSSProperties = {
  borderBottom: "none",
};

const detailLabelCol: React.CSSProperties = {
  width: "140px",
  verticalAlign: "top",
};

const detailLabel: React.CSSProperties = {
  margin: "16px 0",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: colors.textFaint,
};

const detailValue: React.CSSProperties = {
  margin: "16px 0",
  fontSize: "15px",
  lineHeight: "1.5",
  color: colors.text,
};

const detailLink: React.CSSProperties = {
  color: colors.accent,
  textDecoration: "none",
};

const messageCard: React.CSSProperties = {
  backgroundColor: colors.surfaceMuted,
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "24px",
};

const messageLabel: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: colors.textFaint,
};

const messageBody: React.CSSProperties = {
  margin: 0,
  fontSize: "15px",
  lineHeight: "1.7",
  color: colors.text,
  whiteSpace: "pre-wrap",
};

const divider: React.CSSProperties = {
  borderColor: colors.border,
  margin: "8px 0 20px",
};

const footerText: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: "12px",
  lineHeight: "1.6",
  color: colors.textFaint,
  textAlign: "center",
};

const footerMeta: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  color: colors.textMuted,
  textAlign: "center",
};

const footerLink: React.CSSProperties = {
  color: colors.accent,
  textDecoration: "none",
};
