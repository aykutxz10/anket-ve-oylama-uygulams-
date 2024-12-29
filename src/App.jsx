import React, { useState } from 'react';
import './App.css';

function App() {
  // Sorular ve seçenekler
  const questions = [
    { question: "En çok hangi programlama dilini kullanıyorsunuz?", options: ["Java", "Python", "C++", "JavaScript"] },
    { question: "Hangi tür yazılım geliştirme alanlarında çalışıyorsunuz?", options: ["Web Geliştirme", "Mobil Uygulama Geliştirme", "Oyun Geliştirme", "Veri Bilimi"] },
    { question: "Hangi yazılım geliştirme ortamını (IDE) tercih ediyorsunuz?", options: ["Visual Studio Code", "IntelliJ IDEA", "Eclipse", "PyCharm"] },
    { question: "Veritabanı yönetim sistemlerinden hangisini daha çok kullanıyorsunuz?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
    { question: "Yazılım geliştirme sürecinde en çok hangi araçları kullanıyorsunuz?", options: ["Git", "Docker", "Jenkins", "Jira"] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Şu anki soru
  const [selectedOption, setSelectedOption] = useState(""); // Seçilen seçenek
  const [answers, setAnswers] = useState([]); // Kullanıcının cevapları
  const [isCompleted, setIsCompleted] = useState(false); // Anket tamamlandı mı?

  // Oy ver ve bir sonraki soruya geç
  const handleVote = () => {
    if (selectedOption) {
      // Cevapları güncelleme: Eğer zaten cevap verilmişse, güncelleriz
      const updatedAnswers = answers.filter(
        (answer) => answer.question !== questions[currentQuestionIndex].question
      );

      updatedAnswers.push({ question: questions[currentQuestionIndex].question, answer: selectedOption });
      setAnswers(updatedAnswers);

      // Sonraki soruya geç
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsCompleted(true); // Anket tamamlandı
      }

      setSelectedOption(""); // Seçilen seçeneği sıfırla
    } else {
      alert("Lütfen bir seçenek belirleyin.");
    }
  };

  // Geri git
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Bir önceki soruya git
      // Geri giderken seçilen seçeneği güncelleriz
      const previousAnswer = answers.find(
        (answer) => answer.question === questions[currentQuestionIndex - 1].question
      );
      if (previousAnswer) {
        setSelectedOption(previousAnswer.answer); // Önceki cevabı seçili hale getir
      }
    }
  };

  // Yeni anket başlat
  const handleNewSurvey = () => {
    setAnswers([]); // Cevapları sıfırla
    setCurrentQuestionIndex(0); // Soruları sıfırla
    setIsCompleted(false); // Anketi başlat
    setSelectedOption(""); // Seçimi sıfırla
  };

  // Sonuçları Gösterme
  const showResults = () => {
    return (
      <div>
        <h2>Sonuçlar</h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <strong>{answer.question}</strong>: {answer.answer}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Şu anki soru ve seçenekler
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <header className="app-header">
        <h1>Anket ve Oylama Uygulamasına Hoş Geldiniz!</h1>
      </header>

      {!isCompleted ? (
        <div className="survey-container">
          <div className="questions">
            <h2>{currentQuestion.question}</h2>
            <div className="options">
              {currentQuestion.options.map((option) => (
                <div key={option} className="option">
                  <input
                    type="radio"
                    id={option}
                    name="survey"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>

            <div className="navigation-buttons">
              <button onClick={handleBack} className="back-button" disabled={currentQuestionIndex === 0}>
                Geri
              </button>
              <button onClick={handleVote} className="vote-button">
                Oy Ver
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="survey-results">
          <h1>TEŞEKKÜRLER</h1>
          {showResults()}
          <button onClick={handleNewSurvey} className="new-survey-button">
            Yeni Ankete Başlayın
          </button>
        </div>
      )}
    </div>
  );
}

export default App;