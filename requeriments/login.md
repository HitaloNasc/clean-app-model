# Login no Sistema

<hr/>

## Story

**Como** usuário registrado do sistema,
**Eu quero** ser capaz de fazer login na minha conta,
**Para que** eu possa acessar os recursos e funcionalidades exclusivos do sistema.

## Critérios de Aceitação

1. O usuário deve fornecer um email válido e uma senha correta.

2. O sistema deve verificar se o email fornecido está registrado no banco de dados.

3. O sistema deve comparar a senha fornecida com a senha armazenada no banco de dados para o email correspondente.

4. Se o email não estiver registrado, o sistema deve exibir uma mensagem de erro informando ao usuário que o email não está cadastrado.

5. Se a senha fornecida não corresponder à senha registrada para o email fornecido, o sistema deve exibir uma mensagem de erro informando ao usuário que a senha está incorreta.

6. Se o email e a senha estiverem corretos, o sistema deve autenticar o usuário e redirecioná-lo para a página principal do sistema.

7. Durante o processo de login, o sistema deve garantir a segurança das informações transmitidas, por meio de criptografia ou outros métodos adequados.

8. O sistema deve fornecer uma opção para o usuário redefinir a senha em caso de esquecimento ou perda da mesma.

### Notas:

1. O email fornecido deve ser válido e ter no máximo 255 caracteres.

2. A senha deve ser mantida em formato seguro e não deve ser armazenada em texto simples no banco de dados.

## Exceções

1. Retorna erro **404** se a API não existir.

2. Retorna erro **412** se email ou password não forem fornecidos pelo client.

3. Retorna erro **412** se o campo email for um e-mail inválido.

4. Retorna erro **401** se não encontrar um usuário com os dados fornecidos.

5. Retorna erro **500** se der erro ao tentar gerar o token de acesso.

6. Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado.
