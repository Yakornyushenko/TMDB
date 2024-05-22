"use client";
import React, { FC } from "react";
import "./RateModalForm.scss";
import "../../styles/constants/colors.scss";

import { BaseModalProps, Modal } from "@/src/components/Modal/Modal";
import { RateModalForm } from "@/src/ui/RateModal/components/RateModalForm";
import { Movies } from "@/src/types/base";

export interface RateModalProps extends BaseModalProps {
  movieTitle: string;
  id: number;
  image: string;
  rating: number;
  release: number;
  voteCount: number;
  genres: Movies.Genre;
}

export const RateModal: FC<RateModalProps> = (props) => {
  const { setIsOpen } = props;
  return (
    <Modal setIsOpen={setIsOpen} modalTitle="Your rating">
      <RateModalForm {...props} />
    </Modal>
  );
};
