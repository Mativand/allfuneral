import { useEffect, useState } from "react";
import styles from "./Company.module.scss";
import IconButton from "@/shared/api/ui/IconButton/IconButton";
import CompanyDetails from "@/entities/company/ui/details/CompanyDetails";
import CompanyPhotos from "@/entities/company/ui/photos/CompanyPhotos";
import CompanyContacts from "@/entities/contact/Contact";
import RenameCompany from "@/entities/company/ui/rename/RenameCompany";
import DeleteCompany from "@/entities/company/ui/delete/DeleteCompany";
import { observer } from "mobx-react-lite";
import { get as getCompany } from '@/entities/company/api';
import { getContact } from '@/entities/contact/api';
import { auth } from '@/shared/api/auth'
import { contactStore } from "@/entities/contact/store";
import { companyStore } from "@/entities/company/store";

interface CompanyProps {
  companyId: number;
  contactId: number;
}

const Company = observer(({ companyId, contactId }: CompanyProps) => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const company = companyStore.getCompany();

  const fetchCompany = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First check if we have a valid token
      const token = localStorage.getItem('token');
      if (!token) {
        // Try to authenticate
        const isAuthenticated = await auth('admin');
        if (!isAuthenticated) {
          throw new Error('Authentication failed');
        }
      }

      const company = await getCompany(companyId);
      const contacts = await getContact(contactId);
      companyStore.setCompany(company);
      contactStore.setContact(contacts);
    } catch (err) {
      setError('Failed to load company data');
      console.error('Error fetching company:', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (company === null) {
    return <div>Company not found</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.company}>
        <div className={styles.company__backButton}>
            <IconButton icon="chevron" onClick={() => {}} />
        </div>
        <div className={styles.company__main}>
          <div className={styles.company__main__header}>
            <div className={styles.company__main__header__title}>
              {company.name}
            </div>
            <div className={styles.company__main__header__actions}>
              <IconButton icon="edit" onClick={() => setIsRenameOpen(true)} />
              <IconButton icon="trash" color="#D72323" onClick={() => setIsDeleteOpen(true)} />
            </div>
          </div>
          <div className={styles.company__main__content}>
            <CompanyDetails />
            <CompanyContacts />
            <CompanyPhotos />
          </div>
        </div>
      </div>
      <RenameCompany isOpen={isRenameOpen} onClose={() => setIsRenameOpen(false)} />
      <DeleteCompany isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} />
    </>
  );
});

export default Company;
