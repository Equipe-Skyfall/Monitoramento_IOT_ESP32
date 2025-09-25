# SkyFall - Sistema de Monitoramento IoT

<p>Projeto desenvolvido para integração de microcontroladores ESP32 com Node.js, armazenamento em MongoDB e frontend para visualização em tempo real dos dados coletados.</p>

---

## 📑 Sumário
- [Visão do Projeto](#visao-do-projeto)
- [Tecnologias utilizadas](#tecnologias)
- [MVP](#mvp)
- [Requisitos](#requisitos)
- [Product Backlog](#backlog)
- [Equipe](#equipe)

---

## 👁 Visão do Projeto <a name="visao-do-projeto"></a>
<p>
O projeto tem como objetivo coletar dados de sensores (como temperatura e umidade) via microcontrolador ESP32, transmitir essas informações por meio de comunicação serial, armazená-las em um banco de dados MongoDB Atlas e disponibilizá-las em um frontend simples para monitoramento em tempo real.  

A solução pode ser expandida para diferentes tipos de sensores, sendo um passo inicial para aplicações em IoT (Internet of Things).
</p>

---


## 💻 Tecnologias utilizadas <a name="tecnologias"></a>
<div align="center">
<img src="https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=green">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-000000?style=for-the-badge&logo=mongodb&logoColor=green">
<img src="https://img.shields.io/badge/html5-000000?style=for-the-badge&logo=html5&logoColor=orange">
<img src="https://img.shields.io/badge/css3-000000?style=for-the-badge&logo=css3&logoColor=blue">
<img src="https://img.shields.io/badge/esp32-000000?style=for-the-badge&logo=espressif&logoColor=red">
<img src="https://img.shields.io/badge/git-000000?style=for-the-badge&logo=git&logoColor=red">
</div>

---

## 🎯 MVP <a name="mvp"></a>
- Receber dados de temperatura e umidade do ESP32 via serial.
- Armazenar dados em MongoDB Atlas.
- Criar frontend simples (HTML + CSS + Fetch API) para visualizar últimos registros.
- Backend Node.js com Express expondo API REST.

---

## 📜 Product Backlog <a name="backlog"></a>

| RANK | SPRINT | PRIORIDADE | ESTIMATIVA | USER STORY | STATUS |
|:----:|:------:|:----------:|:----------:|:----------|:------:|
| 1    |   1    | Alta       | 5          | Como sistema, quero receber dados do ESP32 via serial, para armazenar em banco. | ✅ |
| 2    |   1    | Alta       | 3          | Como desenvolvedor, quero salvar os dados em MongoDB Atlas, para garantir persistência. | ✅ |
| 3    |   1    | Alta       | 5          | Como usuário, quero visualizar os últimos dados em um frontend simples. | ✅ |
| 4    |   2    | Média      | 5          | Como usuário, quero ver gráficos básicos (linha/tempo), para entender tendências. | ⏳ |
| 6    |   3    | Baixa      | 8          | Como administrador, quero exportar relatórios em CSV/PDF. | ⏳ |

---

## 👥 Equipe <a name="equipe"><a>
|  Foto        |     Função    |           Nome            |                            LinkedIn                            |                      GitHub                       |
| :----: | :-----------: | :-----------------------: | :------------------------------------------------------------: | :-----------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/160733714?v=4" width="75px"> | Dev Team  | Eduardo da Silva Fontes | [Linkedin](https://www.linkedin.com/in/eduardo-da-silva-fontes/)  | [GitHub](https://github.com/DuuhZero)           |
| <img src="https://avatars.githubusercontent.com/u/162118889?v=4" width="75px"> | Dev Team | Eduardo Kuwahara Jr. |  [Linkedin](https://www.linkedin.com/in/eduardo-kuwahara-3b2267303/)  | [GitHub](https://github.com/EduardoKuwahara) |
| <img src="https://avatars.githubusercontent.com/u/161594793?v=4" width="75px"> | Dev Team      | Eric Kawata |  [Linkedin](https://www.linkedin.com/in/eric-kawata-99678b302/)  | [GitHub](https://github.com/ericFatec)    |
| <img src="https://avatars.githubusercontent.com/u/144804717?v=4" width="75px"> | Dev Team      | Fábio Hiroshi |  [Linkedin](https://www.linkedin.com/in/f%C3%A1bio-hiroshi-5393a51a0)  | [GitHub](https://github.com/FabioHiros)    |
| <img src="https://avatars.githubusercontent.com/u/119539664?v=4" width="75px">|Dev Team| João Pedro França Alves de Souza |  [Linkedin](https://www.linkedin.com/in/joão-pedro-frança-alves-de-souza-8700a62b3/)  | [GitHub](https://github.com/jofran2001)  |
| <img src="https://avatars.githubusercontent.com/u/162117916?v=4" width="75px"> | Dev Team  | João Vitor Rossi Ferreira |  [Linkedin](https://www.linkedin.com/in/joão-rossi-7311a0301/)  | [GitHub](https://github.com/joaorossiferreira)    |
| <img src="https://avatars.githubusercontent.com/u/95691713?v=4" width="75px"> | Dev Team      | Kathellyn Caroline Alves dos Santos |  [Linkedin](https://www.linkedin.com/in/kathellyn-caroline-a562101b9)  | [GitHub](https://github.com/CarolineKathellyn)    |
| <img src="https://avatars.githubusercontent.com/u/162117908?v=4" width="75px"> | Dev Team      | Paulo Henrique Martins de Almeida |  [Linkedin](https://www.linkedin.com/in/paulo-almeida-3102452a7/)  | [GitHub](https://github.com/pauloalmeida46)    |
| <img src="https://avatars.githubusercontent.com/u/161987258?v=4" width="75px"> | Dev Team      | Victor Daniel |  [Linkedin](https://www.linkedin.com/in/victor-daniel-ramos-bessa-1436a3215/)  | [GitHub](https://github.com/victordanielrb)    |
