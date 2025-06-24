-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/06/2025 às 04:44
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `integra`
--
CREATE DATABASE IF NOT EXISTS `integra` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `integra`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `administrador`
--

CREATE TABLE `administrador` (
  `id_administrador` varchar(10) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `id_aluno` int(11) NOT NULL,
  `rm` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `curso` varchar(100) NOT NULL,
  `modulo_ano` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `aluno`
--

INSERT INTO `aluno` (`id_aluno`, `rm`, `nome`, `curso`, `modulo_ano`, `email`, `senha`, `data_cadastro`) VALUES
(1, 123456, 'Gabriel Silva', 'Informática', '3º Módulo', 'gabriel@email.com', 'senha123', '2025-06-24 00:17:32'),
(2, 654321, 'Maria Lima', 'Administração', '1º Ano', 'maria@email.com', 'admin2024', '2025-06-24 00:17:32'),
(3, 789012, 'João Pedro', 'Logística', '3º Módulo', 'joao@email.com', 'logistica321', '2025-06-24 00:17:32');

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno_palestra`
--

CREATE TABLE `aluno_palestra` (
  `id_aluno` int(11) NOT NULL,
  `id_palestra_participante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno_visita`
--

CREATE TABLE `aluno_visita` (
  `id_aluno` int(11) NOT NULL,
  `id_visita_tecnica_participante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador`
--

CREATE TABLE `coordenador` (
  `id_coordenador` int(11) NOT NULL,
  `matricula` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `coordenador`
--

INSERT INTO `coordenador` (`id_coordenador`, `matricula`, `nome`, `email`, `senha`, `data_cadastro`) VALUES
(1, 1001, 'Ana Silva', 'ana.silva@etec.sp.gov.br', 'senha123', '2025-06-24 00:24:53'),
(2, 1002, 'Carlos Andrade', 'carlos.andrade@etec.sp.gov.br', 'senha456', '2025-06-24 00:24:53'),
(3, 1003, 'Fernanda Souza', 'fernanda.souza@fatec.sp.gov.br', 'senha789', '2025-06-24 00:24:53'),
(4, 1004, 'Evanilson Fabrega', 'evan@email.com', '$2b$10$H2.G6aANtpxXMh3/o5vMmOxA8tAjrzWbXTBlp.kXUus2Co2AF59fO', '2025-06-24 02:27:18');

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador_instituicao`
--

CREATE TABLE `coordenador_instituicao` (
  `id_coordenador` int(11) NOT NULL,
  `id_instituicao` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador_palestra_participante`
--

CREATE TABLE `coordenador_palestra_participante` (
  `id_coordenador` int(11) NOT NULL,
  `id_palestra_participante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador_visita`
--

CREATE TABLE `coordenador_visita` (
  `id_coordenador` int(11) NOT NULL,
  `id_visita_tecnica` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador_visita_participante`
--

CREATE TABLE `coordenador_visita_participante` (
  `id_coordenador` int(11) NOT NULL,
  `id_visita_tecnica_participante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `setor` varchar(100) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `uf` char(2) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nome`, `email`, `telefone`, `cidade`, `setor`, `senha`, `cnpj`, `uf`, `cep`) VALUES
(1, 'TechPlus Ltda', 'contato@techplus.com.br', '(11) 4002-8922', 'São Paulo', 'Tecnologia', 'emp123', '12.345.678/0001-90', 'SP', '01000-000'),
(2, 'LogBrasil Transportes', 'rh@logbrasil.com', '(21) 99876-5432', 'Rio de Janeiro', 'Logística', 'log456', '98.765.432/0001-10', 'RJ', '20000-000'),
(3, 'NutriVida Alimentos', 'admin@nutrivida.com', '(31) 91234-5678', 'Belo Horizonte', 'Alimentos', 'nut789', '45.678.912/0001-77', 'MG', '30000-000'),
(4, 'TechPlusPlus Ltda', 'contato@techplusplus.com.br', '(11) 4022-8922', 'São Paulo', 'Tecnologia', '$2b$10$PJDRGw9bl3STrnAReUlN6Oq79VjI3hsgyziP4A0Yy5LnTTC5Vigo.', '12.345.628/0001-90', 'SP', '01200-000');

-- --------------------------------------------------------

--
-- Estrutura para tabela `feedback_evento`
--

CREATE TABLE `feedback_evento` (
  `id_feedback` int(11) NOT NULL,
  `id_aluno` int(11) NOT NULL,
  `id_evento` int(11) NOT NULL,
  `tipo_evento` enum('Palestra','Visita') NOT NULL,
  `avaliacao` int(11) DEFAULT NULL CHECK (`avaliacao` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `data_feedback` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `instituicao`
--

CREATE TABLE `instituicao` (
  `id_instituicao` varchar(10) NOT NULL,
  `cod_instituicao` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `tipo` enum('ETEC','FATEC') NOT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `log_evento`
--

CREATE TABLE `log_evento` (
  `id_log` int(11) NOT NULL,
  `id_usuario` varchar(10) DEFAULT NULL,
  `acao` varchar(50) DEFAULT NULL,
  `id_referencia` int(11) DEFAULT NULL,
  `tipo_evento` enum('Palestra','Visita') DEFAULT NULL,
  `data_acao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `palestra`
--

CREATE TABLE `palestra` (
  `id_palestra` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `data_palestra` date DEFAULT NULL,
  `hora_palestra` time DEFAULT NULL,
  `status` enum('Pendente','Aprovada','Concluída','Cancelada') DEFAULT 'Pendente',
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `cep` varchar(9) DEFAULT NULL,
  `id_instituicao` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `palestrante`
--

CREATE TABLE `palestrante` (
  `id_palestrante` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `area_atuacao` varchar(100) DEFAULT NULL,
  `experiencia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `palestra_participante`
--

CREATE TABLE `palestra_participante` (
  `id_palestra_participante` int(11) NOT NULL,
  `status` enum('Inscrito','Confirmado','Cancelado') DEFAULT 'Inscrito',
  `data_inscricao` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_palestra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `palestra_realizada`
--

CREATE TABLE `palestra_realizada` (
  `id_palestrante` int(11) NOT NULL,
  `id_palestra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `visita_tecnica`
--

CREATE TABLE `visita_tecnica` (
  `id_visita_tecnica` varchar(10) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `data_visita` date DEFAULT NULL,
  `hora_visita` time DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `status` enum('Pendente','Aprovada','Concluída','Cancelada') DEFAULT 'Pendente',
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_empresa` int(11) NOT NULL,
  `id_instituicao` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `visita_tecnica_participante`
--

CREATE TABLE `visita_tecnica_participante` (
  `id_visita_tecnica_participante` int(11) NOT NULL,
  `status` enum('Inscrito','Confirmado','Cancelado') DEFAULT 'Inscrito',
  `data_inscricao` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_visita_tecnica` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_administrador`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`id_aluno`),
  ADD UNIQUE KEY `rm` (`rm`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `aluno_palestra`
--
ALTER TABLE `aluno_palestra`
  ADD PRIMARY KEY (`id_aluno`,`id_palestra_participante`),
  ADD KEY `id_palestra_participante` (`id_palestra_participante`);

--
-- Índices de tabela `aluno_visita`
--
ALTER TABLE `aluno_visita`
  ADD PRIMARY KEY (`id_aluno`,`id_visita_tecnica_participante`),
  ADD KEY `id_visita_tecnica_participante` (`id_visita_tecnica_participante`);

--
-- Índices de tabela `coordenador`
--
ALTER TABLE `coordenador`
  ADD PRIMARY KEY (`id_coordenador`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `coordenador_instituicao`
--
ALTER TABLE `coordenador_instituicao`
  ADD PRIMARY KEY (`id_coordenador`,`id_instituicao`),
  ADD KEY `id_instituicao` (`id_instituicao`);

--
-- Índices de tabela `coordenador_palestra_participante`
--
ALTER TABLE `coordenador_palestra_participante`
  ADD PRIMARY KEY (`id_coordenador`,`id_palestra_participante`),
  ADD KEY `id_palestra_participante` (`id_palestra_participante`);

--
-- Índices de tabela `coordenador_visita`
--
ALTER TABLE `coordenador_visita`
  ADD PRIMARY KEY (`id_coordenador`,`id_visita_tecnica`),
  ADD KEY `id_visita_tecnica` (`id_visita_tecnica`);

--
-- Índices de tabela `coordenador_visita_participante`
--
ALTER TABLE `coordenador_visita_participante`
  ADD PRIMARY KEY (`id_coordenador`,`id_visita_tecnica_participante`),
  ADD KEY `id_visita_tecnica_participante` (`id_visita_tecnica_participante`);

--
-- Índices de tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices de tabela `feedback_evento`
--
ALTER TABLE `feedback_evento`
  ADD PRIMARY KEY (`id_feedback`),
  ADD KEY `id_aluno` (`id_aluno`);

--
-- Índices de tabela `instituicao`
--
ALTER TABLE `instituicao`
  ADD PRIMARY KEY (`id_instituicao`),
  ADD UNIQUE KEY `cod_instituicao` (`cod_instituicao`);

--
-- Índices de tabela `log_evento`
--
ALTER TABLE `log_evento`
  ADD PRIMARY KEY (`id_log`);

--
-- Índices de tabela `palestra`
--
ALTER TABLE `palestra`
  ADD PRIMARY KEY (`id_palestra`),
  ADD KEY `id_instituicao` (`id_instituicao`);

--
-- Índices de tabela `palestrante`
--
ALTER TABLE `palestrante`
  ADD PRIMARY KEY (`id_palestrante`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `palestra_participante`
--
ALTER TABLE `palestra_participante`
  ADD PRIMARY KEY (`id_palestra_participante`),
  ADD KEY `id_palestra` (`id_palestra`);

--
-- Índices de tabela `palestra_realizada`
--
ALTER TABLE `palestra_realizada`
  ADD PRIMARY KEY (`id_palestrante`,`id_palestra`),
  ADD KEY `id_palestra` (`id_palestra`);

--
-- Índices de tabela `visita_tecnica`
--
ALTER TABLE `visita_tecnica`
  ADD PRIMARY KEY (`id_visita_tecnica`),
  ADD KEY `id_empresa` (`id_empresa`),
  ADD KEY `id_instituicao` (`id_instituicao`);

--
-- Índices de tabela `visita_tecnica_participante`
--
ALTER TABLE `visita_tecnica_participante`
  ADD PRIMARY KEY (`id_visita_tecnica_participante`),
  ADD KEY `id_visita_tecnica` (`id_visita_tecnica`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aluno`
--
ALTER TABLE `aluno`
  MODIFY `id_aluno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `coordenador`
--
ALTER TABLE `coordenador`
  MODIFY `id_coordenador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `feedback_evento`
--
ALTER TABLE `feedback_evento`
  MODIFY `id_feedback` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `log_evento`
--
ALTER TABLE `log_evento`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `palestra`
--
ALTER TABLE `palestra`
  MODIFY `id_palestra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `palestrante`
--
ALTER TABLE `palestrante`
  MODIFY `id_palestrante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `palestra_participante`
--
ALTER TABLE `palestra_participante`
  MODIFY `id_palestra_participante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `visita_tecnica_participante`
--
ALTER TABLE `visita_tecnica_participante`
  MODIFY `id_visita_tecnica_participante` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aluno_palestra`
--
ALTER TABLE `aluno_palestra`
  ADD CONSTRAINT `aluno_palestra_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`) ON DELETE CASCADE,
  ADD CONSTRAINT `aluno_palestra_ibfk_2` FOREIGN KEY (`id_palestra_participante`) REFERENCES `palestra_participante` (`id_palestra_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `aluno_visita`
--
ALTER TABLE `aluno_visita`
  ADD CONSTRAINT `aluno_visita_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`) ON DELETE CASCADE,
  ADD CONSTRAINT `aluno_visita_ibfk_2` FOREIGN KEY (`id_visita_tecnica_participante`) REFERENCES `visita_tecnica_participante` (`id_visita_tecnica_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `coordenador_instituicao`
--
ALTER TABLE `coordenador_instituicao`
  ADD CONSTRAINT `coordenador_instituicao_ibfk_1` FOREIGN KEY (`id_coordenador`) REFERENCES `coordenador` (`id_coordenador`) ON DELETE CASCADE,
  ADD CONSTRAINT `coordenador_instituicao_ibfk_2` FOREIGN KEY (`id_instituicao`) REFERENCES `instituicao` (`id_instituicao`) ON DELETE CASCADE;

--
-- Restrições para tabelas `coordenador_palestra_participante`
--
ALTER TABLE `coordenador_palestra_participante`
  ADD CONSTRAINT `coordenador_palestra_participante_ibfk_1` FOREIGN KEY (`id_coordenador`) REFERENCES `coordenador` (`id_coordenador`) ON DELETE CASCADE,
  ADD CONSTRAINT `coordenador_palestra_participante_ibfk_2` FOREIGN KEY (`id_palestra_participante`) REFERENCES `palestra_participante` (`id_palestra_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `coordenador_visita`
--
ALTER TABLE `coordenador_visita`
  ADD CONSTRAINT `coordenador_visita_ibfk_1` FOREIGN KEY (`id_coordenador`) REFERENCES `coordenador` (`id_coordenador`) ON DELETE CASCADE,
  ADD CONSTRAINT `coordenador_visita_ibfk_2` FOREIGN KEY (`id_visita_tecnica`) REFERENCES `visita_tecnica` (`id_visita_tecnica`) ON DELETE CASCADE;

--
-- Restrições para tabelas `coordenador_visita_participante`
--
ALTER TABLE `coordenador_visita_participante`
  ADD CONSTRAINT `coordenador_visita_participante_ibfk_1` FOREIGN KEY (`id_coordenador`) REFERENCES `coordenador` (`id_coordenador`) ON DELETE CASCADE,
  ADD CONSTRAINT `coordenador_visita_participante_ibfk_2` FOREIGN KEY (`id_visita_tecnica_participante`) REFERENCES `visita_tecnica_participante` (`id_visita_tecnica_participante`) ON DELETE CASCADE;

--
-- Restrições para tabelas `feedback_evento`
--
ALTER TABLE `feedback_evento`
  ADD CONSTRAINT `feedback_evento_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`) ON DELETE CASCADE;

--
-- Restrições para tabelas `palestra`
--
ALTER TABLE `palestra`
  ADD CONSTRAINT `palestra_ibfk_1` FOREIGN KEY (`id_instituicao`) REFERENCES `instituicao` (`id_instituicao`) ON DELETE SET NULL;

--
-- Restrições para tabelas `palestra_participante`
--
ALTER TABLE `palestra_participante`
  ADD CONSTRAINT `palestra_participante_ibfk_1` FOREIGN KEY (`id_palestra`) REFERENCES `palestra` (`id_palestra`) ON DELETE CASCADE;

--
-- Restrições para tabelas `palestra_realizada`
--
ALTER TABLE `palestra_realizada`
  ADD CONSTRAINT `palestra_realizada_ibfk_1` FOREIGN KEY (`id_palestrante`) REFERENCES `palestrante` (`id_palestrante`) ON DELETE CASCADE,
  ADD CONSTRAINT `palestra_realizada_ibfk_2` FOREIGN KEY (`id_palestra`) REFERENCES `palestra` (`id_palestra`) ON DELETE CASCADE;

--
-- Restrições para tabelas `visita_tecnica`
--
ALTER TABLE `visita_tecnica`
  ADD CONSTRAINT `visita_tecnica_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`) ON DELETE CASCADE,
  ADD CONSTRAINT `visita_tecnica_ibfk_2` FOREIGN KEY (`id_instituicao`) REFERENCES `instituicao` (`id_instituicao`) ON DELETE SET NULL;

--
-- Restrições para tabelas `visita_tecnica_participante`
--
ALTER TABLE `visita_tecnica_participante`
  ADD CONSTRAINT `visita_tecnica_participante_ibfk_1` FOREIGN KEY (`id_visita_tecnica`) REFERENCES `visita_tecnica` (`id_visita_tecnica`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
