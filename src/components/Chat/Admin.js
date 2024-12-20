import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import {ShopNowButton} from "./publicidadC"

const CheckPaymentButton = () => {
  const [showButton, setShowButton] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, 'PagoPublicidad'),
          where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const paymentData = querySnapshot.docs[0].data();
          const paymentDate = paymentData.date.toDate();
          const paymentType = paymentData.paymentType;
          
          let expirationDate;

          if (paymentType === 'mensual') {
            expirationDate = dayjs(paymentDate).add(30, 'day');
          } else if (paymentType === 'anual') {
            expirationDate = dayjs(paymentDate).add(12, 'month');
          }

          if (dayjs().isBefore(expirationDate)) {
            setShowButton(true);
          }
        }
      }
    };

    checkPaymentStatus();
  }, [auth, db]);

  return <>{showButton && <ShopNowButton/>}</>;
};

export default CheckPaymentButton;
