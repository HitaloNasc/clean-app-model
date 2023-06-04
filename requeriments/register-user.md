# Registro de Usuário

<hr/>

## Story

**Como** um potencial usuário do sistema,
**Eu quero** ser capaz de me registrar como um novo usuário,
**Para que** eu possa acessar os recursos e funcionalidades do sistema.

<hr/>

## Caso de sucesso

1. ✅ O usuário deve fornecer um nome, um email válido, uma senha forte e uma confirmação de senha.

2. ✅ O sistema deve verificar se o email fornecido ainda não está registrado.

3. ✅ O sistema deve verificar se a senha e a confirmação de senha são idênticas.

4. ✅ Se o email já estiver registrado, o sistema deve exibir uma mensagem de erro informando ao usuário que o email já está em uso.

5. ✅ Se a senha e a confirmação de senha não corresponderem, o sistema deve exibir uma mensagem de erro informando ao usuário que as senhas não correspondem.

6. ✅ Se todos os critérios forem atendidos, o sistema deve registrar o novo usuário, armazenando suas informações no banco de dados.

### Notas:

1. ✅ O nome de usuário pode conter letras, números e espaços, com no mínimo 3 e no máximo 64 caracteres.

2. ✅ O email deve seguir o formato padrão de endereço de email e ter no máximo 255 caracteres.

3. ✅ A senha deve ter no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial.

<hr/>

## Exceções

1. ✅ Retorna erro **404** se a API não existir.

2. ✅ Retorna erro **412** se name, email, password ou confirmPassword não forem fornecidos pelo client.

3. ✅ Retorna erro **412** se o campo name for inválido.

4. ✅ Retorna erro **412** se o campo email for um e-mail inválido.

5. ✅ Retorna erro **412** se o campo password for inválida.

6. ✅ Retorna erro **412** se encontrar um usuário com o email fornecido.
