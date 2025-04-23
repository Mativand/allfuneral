import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import Select from "@/shared/api/ui/Select/Select";
import MultiSelect from "@/shared/api/ui/MultiSelect/MultiSelect";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./CompanyDetails.module.scss";
import Button from "@/shared/api/ui/Button/Button";
import { companyStore } from "@/entities/company/store";
import { observer } from "mobx-react-lite";
import { formatDate, snakeToRegular } from "./lib";

interface CompanyDetailsEditProps {
  onCancel: () => void;
  onSave: () => void;
}

const CompanyDetailsEdit = observer(({ onCancel, onSave }: CompanyDetailsEditProps) => {
  const company = companyStore.getCompany();

  if (!company) return null;

  const { contract, businessEntity, type } = company;
  const { no, issue_date } = contract || {};
  const date = formatDate(issue_date);
  const types = type?.map((type: string) => ({ value: type, label: snakeToRegular(type) }));


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

  return (
    <CardContainer>
      <CardHeader
        title="Details"
        children={
          <>
            <Button
              variant="fluttened"
              text="Save changes"
              icon="check"
              onClick={onSave}
            />
            <Button
              variant="fluttened"
              text="Cancel"
              icon="x"
              onClick={onCancel}
            />
          </>
        }
      />
      <div className={styles.rows}>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Agreement:" />
          </div>
          <div className={`${styles.column__second} ${styles.agreement__container}`}>
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
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Buisness entity:" />
          </div>
          <div className={styles.column__second}>
            <Select
              value={businessEntity}
              onChange={(value) => onBuisnessEntityChange(value)}
              options={[{value: '1', label: businessEntity}]}
            />
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Company type:" />
          </div>
          <div className={styles.column__second}>
            <MultiSelect
              value={type}
              onChange={(values) => onCompanyTypeChange(values)}
              options={types || []}
            />
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
});

export default CompanyDetailsEdit; 