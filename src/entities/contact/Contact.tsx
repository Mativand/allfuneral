import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import { useState } from "react";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./Contact.module.scss";
import Button from "@/shared/api/ui/Button/Button";
import { contactStore } from "./store";
import { observer } from "mobx-react-lite";

const Contact = observer(() => {
  const [isEditing, setIsEditing] = useState(false);

  const contact = contactStore.getContact();

  if (!contact) return null;

  const { firstname, lastname, phone, email } = contact;
  const responsiblePerson = `${firstname} ${lastname}`;

  const onResponsiblePersonChange = (value: string) => {
    const [firstname, lastname] = value.split(" ");
    contactStore.updateContact({ ...contact, firstname, lastname });
  };

  const onPhoneNumberChange = (value: string) => {
    contactStore.updateContact({ ...contact, phone: value });
  };  

  const onEmailChange = (value: string) => {
    contactStore.updateContact({ ...contact, email: value });
  };


  return (
    <CardContainer>
      <CardHeader
        title="Contact Information"
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
            <CardLabel label="Responsible Person:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Input
                placeholder="Enter responsible person name"
                value={responsiblePerson}
                onChange={(e) => onResponsiblePersonChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{responsiblePerson || "-"}</div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Phone Number:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Input
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{phone || "-"}</div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="E-mail:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Input
                placeholder="Enter email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{email || "-"}</div>
            )}
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
});

export default Contact;
