import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { darkModeState, displayToast } from "@src/store";
import { addContact } from "@src/api/ContactsAPI";
import { acceptRelationship } from "@src/services/contact.service";
import OnboardingLayout from "@src/layouts/OnboardingLayout";

const InvitePage = () => {
  const navigate = useNavigate();
  const darkModeStatus = useRecoilValue(darkModeState);

  const setShowToast = useSetRecoilState(displayToast);

  const [newContactName, setNewContactName] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (newContactName.trim() === "") { setShowToast({ open: true, message: "Please name this contact", extra: "" }); return; }
    const res = await acceptRelationship();
    if (res.success) {
      await addContact(newContactName, res.response?.relId, true);
      setNewContactName("");
    }
    navigate("/");
  };
  useEffect(() => {
    const checkin = localStorage.getItem("checkedIn");
    if (!checkin) {
      localStorage.setItem("checkedIn", "no");
    }
    if (checkin !== "yes") {
      localStorage.setItem("pendingInvite", window.location.href.split("invite/")[1]);
      navigate("/");
    }
  }, []);
  return (
    <OnboardingLayout>
      <p style={{ textAlign: "left", margin: "20px 0 20px 0", fontWeight: 600 }}>
        Welcome to ZinZen!<br />
        The sender of this message wants to connect with you here.
        <br />Add them to your contact list.
      </p>
      <input style={{ width: "100%", fontWeight: 500 }} onChange={(e) => setNewContactName(e.target.value)} className={`default-input${darkModeStatus ? "-dark" : ""}`} placeholder="Contact name" />
      <button
        type="button"
        className={`default-btn${darkModeStatus ? "-dark" : ""}`}
        style={{ alignSelf: "right" }}
        onClick={handleSubmit}
      > Add to my contacts
      </button>
    </OnboardingLayout>
  );
};

export default InvitePage;
