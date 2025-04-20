import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import Select from "@/shared/api/ui/Select/Select";
import MultiSelect from "@/shared/api/ui/MultiSelect/MultiSelect";
import { useState, useEffect } from "react";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./CompanyDetails.module.scss";
import Button from "@/shared/api/ui/Button/Button";
import { companyStore } from "../store";
import { observer } from "mobx-react-lite";
import { formatDate, snakeToRegular } from "./lib";

const CompanyDetails = observer(() => {
  const [isEditing, setIsEditing] = useState(false);

  const company = companyStore.getCompany();

  if (!company) return null;

  const { contract, businessEntity, type } = company;

  const { no, issue_date } = contract || {};

  const [date, setDate] = useState<string | undefined>(undefined);
  const [types, setTypes] = useState<{ value: string; label: string }[] | undefined>(undefined);

  const onAgreementNumberChange = (value: string) => {
    companyStore.updateCompany({
      ...company,
      contract: {
        no: value,
        issue_date: contract?.issue_date || "",
      },
    });
  };

  const onAgreementDateChange = (value: string) => {
    companyStore.updateCompany({
      ...company,
      contract: {
        no: contract?.no || "",
        issue_date: value,
      },
    });
  };

  const onBuisnessEntityChange = (value: string) => {
    companyStore.updateCompany({ ...company, businessEntity: value });
  };

  const onCompanyTypeChange = (values: string[]) => {
    companyStore.updateCompany({ ...company, type: values });
  };
  
  useEffect(() => {
    setDate(formatDate(issue_date));
    setTypes(type?.map((type) => ({ value: type, label: snakeToRegular(type) })));
  }, [issue_date, type]);

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
                    value={no}
                    onChange={(e) => onAgreementNumberChange(e.target.value)}
                  />
                </div>
                <div className={styles.agreement__date}>
                  <div className={styles.agreement__dateLabel}>
                    <CardLabel label="Date:" />
                  </div>
                  <div className={styles.agreement__input}>
                    <Input
                      placeholder="dd.mm.yyyy"
                      value={date}
                      onChange={(e) => onAgreementDateChange(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.text}>
                {no || "-"}{" "}
                {date && <span className={styles.slash}>{'/'}</span>}
                {date && date}
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
                value={businessEntity}
                onChange={(value) => onBuisnessEntityChange(value)}
                options={[{value: '1', label: businessEntity}]}
              />
            ) : (
              <div className={styles.text}>{businessEntity || "-"}</div>
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
                value={type}
                onChange={(values) => onCompanyTypeChange(values)}
                options={types || []}
              />
            ) : (
              <div className={styles.text}>
                {types?.map((type) => type.label).join(", ") || "-"}
              </div>
            )}
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
});

export default CompanyDetails;
