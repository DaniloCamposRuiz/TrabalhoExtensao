import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [quizStarted, setQuizStarted] = useState(false); // Estado para controlar a tela de introdução

  const questions = [
    {
      text: "O que é LGPD?",
      options: [
        "Lei Geral de Proteção de Dados",
        "Lei Geral de Proteção de Direitos",
        "Lei de Garantia de Privacidade",
        "Lei de Garantia de Dados Pessoais",
      ],
      correctIndex: 0,
      explanation:
        "LGPD é a sigla para Lei Geral de Proteção de Dados, que regulamenta o tratamento de dados pessoais no Brasil.",
    },
    {
      text: "Qual é a principal função do controlador de dados?",
      options: [
        "Coletar dados pessoais",
        "Controlar os acessos à rede",
        "Garantir a segurança da informação",
        "Tomar decisões sobre o tratamento de dados pessoais",
      ],
      correctIndex: 3,
      explanation:
        "O controlador de dados é responsável por tomar decisões sobre o tratamento de dados pessoais.",
    },
    {
      text: "Qual é o prazo máximo para o controlador comunicar a ANPD e o titular sobre um incidente de segurança?",
      options: ["24 horas", "48 horas", "72 horas", "7 dias"],
      correctIndex: 2,
      explanation:
        "O controlador deve comunicar a ANPD e o titular sobre um incidente de segurança em até 72 horas.",
    },
    {
      text: "O que é considerado dado pessoal sensível?",
      options: ["Nome completo", "CPF", "Dados de saúde", "Endereço de e-mail"],
      correctIndex: 2,
      explanation:
        "Dados de saúde são considerados dados pessoais sensíveis, que exigem proteção especial.",
    },
    {
      text: "Quem é responsável por fiscalizar o cumprimento da LGPD?",
      options: [
        "O Poder Judiciário",
        "A Polícia Federal",
        "A ANPD (Autoridade Nacional de Proteção de Dados)",
        "O Ministério Público",
      ],
      correctIndex: 2,
      explanation:
        "A ANPD (Autoridade Nacional de Proteção de Dados) é responsável por fiscalizar o cumprimento da LGPD.",
    },
    {
      text: "Qual é a penalidade máxima prevista na LGPD?",
      options: [
        "Advertência",
        "Multa de até 2% do faturamento da empresa",
        "Proibição do tratamento de dados",
        "Bloqueio dos dados pessoais",
      ],
      correctIndex: 1,
      explanation:
        "A penalidade máxima é uma multa de até 2% do faturamento da empresa, limitada a R$ 50 milhões por infração.",
    },
    {
      text: "O que é considerado um incidente de segurança?",
      options: [
        "Acesso não autorizado a dados pessoais",
        "Envio de e-mails não solicitados",
        "Perda de um dispositivo móvel",
        "Divulgação de dados sem consentimento",
      ],
      correctIndex: 0,
      explanation:
        "Um incidente de segurança inclui qualquer acesso não autorizado a dados pessoais.",
    },
    {
      text: "O consentimento do titular é necessário para todas as formas de tratamento de dados?",
      options: [
        "Sim, sempre",
        "Não, existem exceções previstas em lei",
        "Somente para dados sensíveis",
        "Apenas quando solicitado pelo titular",
      ],
      correctIndex: 2,
      explanation:
        "Existem exceções previstas na lei onde o consentimento não é necessário, mas para dados sensíveis, o consentimento é essencial.",
    },
    {
      text: "O que significa a anonimização de dados?",
      options: [
        "Coletar dados sem identificação",
        "Eliminar dados pessoais",
        "Remover a possibilidade de identificar o titular dos dados",
        "Criptografar os dados",
      ],
      correctIndex: 2,
      explanation:
        "A anonimização de dados significa remover qualquer possibilidade de identificar o titular dos dados.",
    },
    {
      text: "Quem é o encarregado de dados?",
      options: [
        "A pessoa que coleta os dados",
        "A pessoa responsável por proteger os dados",
        "A pessoa que toma decisões sobre os dados",
        "A pessoa que interage com a ANPD e os titulares",
      ],
      correctIndex: 3,
      explanation:
        "O encarregado de dados é a pessoa que interage com a ANPD e os titulares sobre o tratamento de dados.",
    },
  ];

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    if (index === questions[currentQuestion].correctIndex) {
      setFeedback("Você acertou!");
    } else {
      setFeedback(`Você errou! ${questions[currentQuestion].explanation}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback("");
    } else {
      // Finalizar o quiz
      Alert.alert("Quiz Concluído", "Parabéns! Você completou o quiz!", [
        { text: "OK", onPress: () => resetQuiz() },
      ]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
      setFeedback("");
    }
  };

  // Função para iniciar o quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Função para reiniciar o quiz após conclusão
  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFeedback("");
  };

  if (!quizStarted) {
    return (
      <View style={styles.introContainer}>
        <Text style={styles.introText}>
          Bem-vindo ao Quiz sobre LGPD e Direito Cibernético!
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
          <Text style={styles.startButtonText}>Começar Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].text}</Text>

      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === index
              ? styles.selectedOption
              : styles.defaultOption,
          ]}
          onPress={() => handleOptionPress(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}

      {/* Botões de Navegação: Anterior e Próxima */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestion === 0 ? styles.disabledButton : styles.activeButton,
          ]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.navButtonText}>Pergunta Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            selectedOption === null
              ? styles.disabledButton
              : styles.activeButton,
          ]}
          onPress={handleNextQuestion}
          disabled={selectedOption === null}
        >
          <Text style={styles.navButtonText}>
            {currentQuestion === questions.length - 1
              ? "Finalizar Quiz"
              : "Próxima Pergunta"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mensagem Final (opcional, já tratada pelo Alert) */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  introContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  introText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  startButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  optionButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  defaultOption: {
    backgroundColor: "#d3d3d3",
  },
  selectedOption: {
    backgroundColor: "#4682B4",
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
  },
  feedback: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    color: "#ff6347",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  navButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#32CD32",
  },
  disabledButton: {
    backgroundColor: "#a9a9a9",
  },
  navButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  finalText: {
    fontSize: 20,
    color: "#4682B4",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Quiz;
