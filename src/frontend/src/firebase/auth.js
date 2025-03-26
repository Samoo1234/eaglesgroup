import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Registrar um novo usuário
export const registerUser = async (userData) => {
  const { email, password, firstName, lastName, company, role = 'user' } = userData;
  
  try {
    // Criar usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Atualizar o perfil do usuário com o nome
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Criar documento do usuário no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      company,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // Definir empresa padrão
    const defaultCompany = {
      id: 1,
      name: 'Eagles Group LLC',
      type: 'construction'
    };
    
    localStorage.setItem('currentCompany', JSON.stringify(defaultCompany));
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role
    };
  } catch (error) {
    throw error;
  }
};

// Login de usuário
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Obter dados adicionais do usuário do Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Definir empresa padrão
      const defaultCompany = {
        id: 1,
        name: 'Eagles Group LLC',
        type: 'construction'
      };
      
      localStorage.setItem('currentCompany', JSON.stringify(defaultCompany));
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        ...userData
      };
    } else {
      throw new Error('Dados do usuário não encontrados');
    }
  } catch (error) {
    throw error;
  }
};

// Logout de usuário
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentCompany');
    return true;
  } catch (error) {
    throw error;
  }
};

// Recuperação de senha
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
};

// Observer para mudanças no estado de autenticação
export const authStateObserver = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuário está logado
      getDoc(doc(db, 'users', user.uid))
        .then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            callback({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              ...userData
            });
          } else {
            callback({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            });
          }
        })
        .catch((error) => {
          console.error('Erro ao obter dados do usuário:', error);
          callback({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          });
        });
    } else {
      // Usuário não está logado
      callback(null);
    }
  });
};
