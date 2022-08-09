import { FC } from "react";
import {
  SortableElement,
  SortableContainer,
  arrayMove,
} from "react-sortable-hoc";
import styled from "styled-components";
import styles from "../styles/Home.module.css";

type ImagesProps = { images: string[]; onSort: (images: string[]) => void };

const SortableItem = SortableElement<{ image: string }>(
  ({ image }: { image: string }) => (
    <div className={styles.imageUploadPreview}>
      <Image src={image} alt="" />
    </div>
  )
);

const SortableList = SortableContainer<{ images: string[] }>(
  ({ images }: { images: string[] }) => {
    return (
      <div>
        {images.map((image, index) => (
          <SortableItem key={image} index={index} image={image} />
        ))}
      </div>
    );
  }
);

const ImagesOrder: FC<ImagesProps> = ({ images, onSort }) => {
  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newArray = arrayMove(images, oldIndex, newIndex);
    onSort(newArray);
  };
  return (
    <div>
      <SortableList axis="xy" images={images} onSortEnd={handleSortEnd} />
    </div>
  );
};

export default ImagesOrder;

const Image = styled.img`
  width: 150px;
  aspect-ratio: 1.5;
  object-fit: cover;
`;
