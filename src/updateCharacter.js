import { doc, updateDoc } from "firebase/firestore";

export async function updateCurrentCharacterInFirebase(
  db,
  googleUser,
  userData,
  selectedCharacter,
  currentCharacter
) {
  const userDocRef = doc(db, "Dnd", googleUser.uid);
  const characterId = userData[selectedCharacter].id;
  const characterRef = doc(userDocRef, "Characters", characterId);

  try {
    const characterData = {
      ...currentCharacter,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(characterRef, characterData);
    console.log("Current character updated successfully in Firebase");
  } catch (error) {
    console.error("Error updating current character in Firebase: ", error);
  }
}
