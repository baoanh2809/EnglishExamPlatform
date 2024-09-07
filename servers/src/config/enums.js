const ExamLevel = Object.freeze({
    EASY: 0,
    MEDIUM: 1,
    HARD: 2
});

const ExamType = Object.freeze({
    READING: 0,
    LISTENING: 1,
    WRITING: 2,
    SPEAKING: 3
});

const StatusSendMessage = Object.freeze({
    SENT: 0,
    RECEIVED: 1,
    SEEN: 2
});

const status_conversation = Object.freeze({
    ACTIVE: 0,
    INACTIVE: 1
});

module.exports = {
  ExamLevel,
  ExamType,
  StatusSendMessage
};
