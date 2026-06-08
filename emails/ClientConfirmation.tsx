import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { EMAIL_BRAND } from "./brand";

export interface ClientConfirmationProps {
  name: string;
  projectType: string;
}

const { colors, fontStack } = EMAIL_BRAND;

export function ClientConfirmation({
  name,
  projectType,
}: ClientConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Thank you for reaching out to ${EMAIL_BRAND.name}.`}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Brand header */}
          <Section style={header}>
            <Text style={brandMark}>{EMAIL_BRAND.name.toUpperCase()}</Text>
            <Text style={brandTagline}>{EMAIL_BRAND.tagline}</Text>
          </Section>

          {/* Accent rule */}
          <Section style={accentRuleWrap}>
            <div style={accentRule} />
          </Section>

          {/* Main card */}
          <Section style={card}>
            <Heading style={greeting}>Thank you for reaching out.</Heading>

            <Text style={paragraph}>Dear {name},</Text>

            <Text style={paragraph}>
              We have successfully received your inquiry and our team is
              currently reviewing your requirements.
            </Text>

            <Text style={paragraph}>
              A member of our team will contact you shortly to discuss your
              project in greater detail.
            </Text>

            <Text style={paragraph}>
              We appreciate your interest in {EMAIL_BRAND.name} and look forward
              to learning more about your vision.
            </Text>

            {/* Subtle inquiry summary */}
            <Section style={summaryBox}>
              <Text style={summaryLabel}>YOUR INQUIRY</Text>
              <Text style={summaryValue}>{projectType}</Text>
            </Section>

            <Text style={signature}>
              Warm regards,
              <br />
              <span style={signatureName}>The {EMAIL_BRAND.name} Team</span>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerBrand}>{EMAIL_BRAND.name.toUpperCase()}</Text>
            <Text style={footerMeta}>
              <Link href={`mailto:${EMAIL_BRAND.contactEmail}`} style={footerLink}>
                {EMAIL_BRAND.contactEmail}
              </Link>
              {"  ·  "}
              <Link href={EMAIL_BRAND.url} style={footerLink}>
                {EMAIL_BRAND.domain}
              </Link>
            </Text>
            <Text style={footerLegal}>
              © {new Date().getFullYear()} {EMAIL_BRAND.name}. All rights
              reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

ClientConfirmation.PreviewProps = {
  name: "Jordan Avery",
  projectType: "Web Development",
} satisfies ClientConfirmationProps;

export default ClientConfirmation;

/* ── Styles ── */

const body: React.CSSProperties = {
  margin: 0,
  padding: "40px 0",
  backgroundColor: colors.background,
  fontFamily: fontStack,
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "560px",
  margin: "0 auto",
  padding: "0 24px",
};

const header: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "20px",
};

const brandMark: React.CSSProperties = {
  margin: 0,
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "0.34em",
  color: colors.white,
};

const brandTagline: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: "12px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: colors.accent,
};

const accentRuleWrap: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "28px",
};

const accentRule: React.CSSProperties = {
  display: "inline-block",
  width: "48px",
  height: "3px",
  borderRadius: "999px",
  backgroundColor: colors.accent,
};

const card: React.CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "20px",
  padding: "40px",
};

const greeting: React.CSSProperties = {
  margin: "0 0 24px",
  fontSize: "23px",
  lineHeight: "1.35",
  fontWeight: 600,
  color: colors.heading,
};

const paragraph: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: "15px",
  lineHeight: "1.75",
  color: colors.text,
};

const summaryBox: React.CSSProperties = {
  margin: "28px 0",
  padding: "20px 24px",
  backgroundColor: colors.accentSoft,
  border: `1px solid ${colors.borderStrong}`,
  borderRadius: "14px",
};

const summaryLabel: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  color: colors.accent,
};

const summaryValue: React.CSSProperties = {
  margin: 0,
  fontSize: "16px",
  fontWeight: 600,
  color: colors.white,
};

const signature: React.CSSProperties = {
  margin: "30px 0 0",
  fontSize: "15px",
  lineHeight: "1.7",
  color: colors.textMuted,
};

const signatureName: React.CSSProperties = {
  color: colors.white,
  fontWeight: 600,
};

const divider: React.CSSProperties = {
  borderColor: colors.border,
  margin: "32px 0 24px",
};

const footer: React.CSSProperties = {
  textAlign: "center",
};

const footerBrand: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.24em",
  color: colors.textMuted,
};

const footerMeta: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "12px",
  color: colors.textMuted,
};

const footerLink: React.CSSProperties = {
  color: colors.accent,
  textDecoration: "none",
};

const footerLegal: React.CSSProperties = {
  margin: 0,
  fontSize: "11px",
  color: colors.textFaint,
};
