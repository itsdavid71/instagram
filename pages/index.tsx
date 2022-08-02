import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { TextField, Box, Button, Alert } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { auth } from "../app/firebaseApp";
import AnimatedText from "react-animated-text-content";

import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  if (user) {
    // setEmail(user);
    return (
      <div>
        <h1 className={styles.mainTitle}>
          <AnimatedText
            type="chars" // animate words or chars
            animation={{
              x: "200px",
              y: "-20px",
              scale: 1.1,
              ease: "ease-in-out",
            }}
            animationType="bounce"
            interval={0.06}
            duration={0.8}
            tag="p"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >
            Добро пожаловать в NordicGram
          </AnimatedText>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.mainTitle}>
        <AnimatedText
          type="chars" // animate words or chars
          animation={{
            x: "200px",
            y: "-20px",
            scale: 1.1,
            ease: "ease-in-out",
          }}
          animationType="bounce"
          interval={0.06}
          duration={0.8}
          tag="p"
          className="animated-paragraph"
          includeWhiteSpaces
          threshold={0.1}
          rootMargin="20%"
        >
          Добро пожаловать в NordicGram
        </AnimatedText>
      </h1>
    </div>
  );
};

export default Home;
