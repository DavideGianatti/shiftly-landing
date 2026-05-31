import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

const PRIVACY_CONTACT_EMAIL = "privacy@rosterlyplan.com";
const LAST_UPDATED = "2026-05-31";
const LEONARDO_ADDRESS_LINES = [
  "Schwyzerstrasse 6",
  "8805 Richterswil",
  "Switzerland",
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("Privacy");

  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="text-3xl font-bold tracking-tight text-stone-900">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-stone-400">
        {t("lastUpdated", { date: LAST_UPDATED })}
      </p>

      <div className="mt-10 space-y-10 text-stone-600 leading-relaxed text-[15px]">
        {/* 1. Introduction */}
        <Section title={t("introTitle")}>
          <p>{t("introText")}</p>
        </Section>

        {/* 2. Controllers */}
        <Section title={t("controllerTitle")}>
          <p>{t("controllerText")}</p>
          <div className="mt-4 not-italic text-stone-700">
            <p className="font-semibold">{t("controllerJointLabel")}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <address className="not-italic">
                <div className="font-medium">Davide Gianatti</div>
                <div className="text-sm text-stone-600">
                  Via Como 411
                  <br />
                  22041 Colverde (CO)
                  <br />
                  Italy
                </div>
              </address>
              <address className="not-italic">
                <div className="font-medium">Leonardo Graziano Tatti</div>
                <div className="text-sm text-stone-600">
                  {LEONARDO_ADDRESS_LINES.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < LEONARDO_ADDRESS_LINES.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </address>
            </div>
            <div className="mt-3">
              <a
                href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                className="text-coral-500 underline hover:text-coral-600"
              >
                {PRIVACY_CONTACT_EMAIL}
              </a>
            </div>
            <p className="mt-3 text-sm text-stone-500">
              {t("controllerNoRepresentative")}
            </p>
          </div>
        </Section>

        {/* 3. Data we collect */}
        <Section title={t("dataCollectedTitle")}>
          <p>{t("dataCollectedIntro")}</p>

          <h3 className="mt-4 font-semibold text-stone-800">
            {t("contactFormTitle")}
          </h3>
          <p className="mt-1">{t("contactFormText")}</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>{t("dataName")}</li>
            <li>{t("dataEmail")}</li>
            <li>{t("dataOrganization")}</li>
            <li>{t("dataTeamSize")}</li>
            <li>{t("dataPhone")}</li>
            <li>{t("dataMessage")}</li>
          </ul>

          <h3 className="mt-4 font-semibold text-stone-800">
            {t("technicalDataTitle")}
          </h3>
          <p className="mt-1">{t("technicalDataText")}</p>
        </Section>

        {/* 4. Purpose and legal basis */}
        <Section title={t("purposeTitle")}>
          <p>{t("purposeText")}</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>{t("purposeRespond")}</li>
            <li>{t("purposeDeliver")}</li>
          </ul>
          <p className="mt-3">{t("legalBasisText")}</p>
        </Section>

        {/* 5. Third-party services */}
        <Section title={t("thirdPartyTitle")}>
          <p>{t("thirdPartyIntro")}</p>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>
              <strong>Vercel Inc.</strong> — {t("thirdPartyVercel")}
            </li>
            <li>
              <strong>Resend Inc.</strong> — {t("thirdPartyResend")}
            </li>
          </ul>
          <p className="mt-3">{t("thirdPartyNote")}</p>
        </Section>

        {/* 6. International transfers */}
        <Section title={t("transferTitle")}>
          <p>{t("transferText")}</p>
        </Section>

        {/* 7. Cookies */}
        <Section title={t("cookiesTitle")}>
          <p>{t("cookiesText")}</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <strong>NEXT_LOCALE</strong> — {t("cookieLocale")}
            </li>
          </ul>
          <p className="mt-3">{t("cookiesNone")}</p>
        </Section>

        {/* 8. Security measures */}
        <Section title={t("securityTitle")}>
          <p>{t("securityText")}</p>
        </Section>

        {/* 9. Data retention */}
        <Section title={t("retentionTitle")}>
          <p>{t("retentionText")}</p>
        </Section>

        {/* 10. Your rights */}
        <Section title={t("rightsTitle")}>
          <p>{t("rightsIntro")}</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>{t("rightAccess")}</li>
            <li>{t("rightRectification")}</li>
            <li>{t("rightDeletion")}</li>
            <li>{t("rightRestriction")}</li>
            <li>{t("rightPortability")}</li>
            <li>{t("rightObjection")}</li>
          </ul>
          <p className="mt-3">
            {t("rightsExercise")}{" "}
            <a
              href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
              className="text-coral-500 underline hover:text-coral-600"
            >
              {PRIVACY_CONTACT_EMAIL}
            </a>
            .
          </p>
          <p className="mt-3">{t("rightsComplaint")}</p>
        </Section>

        {/* 11. Children */}
        <Section title={t("childrenTitle")}>
          <p>{t("childrenText")}</p>
        </Section>

        {/* 12. Changes */}
        <Section title={t("changesTitle")}>
          <p>{t("changesText")}</p>
        </Section>

        {/* 13. Contact */}
        <Section title={t("contactTitle")}>
          <p>
            {t("contactText")}{" "}
            <a
              href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
              className="text-coral-500 underline hover:text-coral-600"
            >
              {PRIVACY_CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold text-stone-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
