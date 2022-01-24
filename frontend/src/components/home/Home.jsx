import React from "react";
import Main from "../template/Main"

export default props =>
    <Main icon="home" title="Início"
        subtitle="Em desenvolvimento...">
        <h2>Login:</h2>
        <hr />
        <input type="text" name="login" />
        <input type="password" name="password" />
        <input type="submit" name="submit" />
        

    </Main>