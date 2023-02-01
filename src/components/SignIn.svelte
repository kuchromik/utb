<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import Button from '../shared/Button.svelte';

    let email;
    let password;
    
    const auth = getAuth();
	createUserWithEmailAndPassword(auth, email, password)
  	.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
</script>


<form on:submit|preventDefault={createUserWithEmailAndPassword}>
    <div class="form-field">
        <label for="email">E-Mail</label>
        <input type="text" id="email">
       
    </div>
    <div class="form-field">
        <label for="password">Passwort</label>
        <input type="password" id="password">
        
    </div>
    <Button type="secondary" flat={false}>User registrieren</Button>
</form>