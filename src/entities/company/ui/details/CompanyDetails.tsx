import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import Select from "@/shared/api/ui/Select/Select";
import MultiSelect from "@/shared/api/ui/MultiSelect/MultiSelect";
import { useState } from "react";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./CompanyDetails.module.scss";
import Button from "@/shared/api/ui/Button/Button";

const CompanyDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [agreementNumber, setAgreementNumber] = useState("");
  const [agreementDate, setAgreementDate] = useState("");
  const [buisnessEntity, setBuisnessEntity] = useState("");
  const [companyType, setCompanyType] = useState<string[]>([]);

  return (
    <CardContainer>
      <CardHeader
        title="Details"
        children={
          <>
            {isEditing ? (
              <>
                <Button
                  variant="fluttened"
                  text="Save changes"
                  icon="check"
                  onClick={() => setIsEditing(false)}
                />
                <Button
                  variant="fluttened"
                  text="Cancel"
                  icon="x"
                  onClick={() => setIsEditing(false)}
                />
              </>
            ) : (
              <Button
                variant="fluttened"
                text="Edit"
                icon="edit"
                onClick={() => setIsEditing(true)}
              />
            )}
          </>
        }
      />
      <div className={styles.rows}>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Agreement:" />
          </div>
          <div
            className={`${styles.column__second} ${styles.agreement__container}`}
          >
            {isEditing ? (
              <>
                <div className={styles.agreement__input}>
                  <Input
                    placeholder="0000/0-00"
                    value={agreementNumber}
                    onChange={(e) => setAgreementNumber(e.target.value)}
                  />
                </div>
                <div className={styles.agreement__date}>
                  <div className={styles.agreement__dateLabel}>
                    <CardLabel label="Date:" />
                  </div>
                  <div className={styles.agreement__input}>
                    <Input
                      placeholder="dd.mm.yyyy"
                      value={agreementDate}
                      onChange={(e) => setAgreementDate(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.text}>
                {agreementNumber || "-"}{" "}
                {agreementDate &&
                  `${(
                    <span className={styles.slash}>/</span>
                  )} ${agreementDate}`}
              </div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Buisness entity:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Select
                value={buisnessEntity}
                onChange={(value) => setBuisnessEntity(value)}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
            ) : (
              <div className={styles.text}>{buisnessEntity || "-"}</div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Company type:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <MultiSelect
                value={companyType}
                onChange={(values) => setCompanyType(values)}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
            ) : (
              <div className={styles.text}>
                {companyType.length > 0 ? companyType.join(", ") : "-"}
              </div>
            )}
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
};

export default CompanyDetails;
