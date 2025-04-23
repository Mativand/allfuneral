import Button from "@/shared/api/ui/Button/Button";
import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import styles from "./CompanyPhotos.module.scss";
import Photo from "./Photo";
import { observer } from "mobx-react-lite";
import { companyStore } from "../../store";

const CompanyPhotos = observer(() => {
  const company = companyStore.getCompany();

  if (!company) return null;

  const { photos } = company;

  const onAddPhoto = () => {
    console.log("Add photo");
  };

  const onDeletePhoto = (name: string) => {
    console.log("Delete photo", name);
  };

  return (
    <CardContainer>
      <CardHeader
        title="Photos"
        children={
          <>
            <Button
              variant="fluttened"
              text="Add"
              icon="addPhoto"
              onClick={onAddPhoto}
            />
          </>
        }
      />
      <div className={styles.photos}>
        <div className={styles.photos__item}>
          {photos.map((photo) => (
            <Photo
              key={photo.name}
              name={photo.name}
              url={photo.filepath}
              onDelete={onDeletePhoto}
            />
          ))}
        </div>
      </div>
    </CardContainer>
  );
});

export default CompanyPhotos;
