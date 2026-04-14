# Mini-project
# Shloksence
AI + Bhagavad Gita Based Emotional Support Platform


## Table of Contents
- Abstract
- Keywords
- Introduction
- Problem Statement
- Objectives
- Literature Review
- Proposed Methodology
- System Architecture
- Technology Stack
- Workflow
- Features
- Implementation Plan
- Expected Results
- Limitations
- Future Enhancements
- Ethical Considerations
- Conclusion
- References


## Abstract
Shloksence is a MERN stack-based web application designed to provide structured emotional guidance by integrating modern Artificial Intelligence with curated wisdom from the Bhagavad Gita.
The system uses a Large Language Model (LLM) API to classify user emotions and maps them to a verified Bhagavad Gita shlok database stored in MongoDB. The platform provides structured responses including:
Original Shlok
Simplified Meaning
Practical Action Steps
Daily Suggestion
The system ensures privacy through anonymous mode and integrates emergency distress detection mechanisms.


## Keywords
MERN Stack, MongoDB, Express.js, React.js, Node.js, Web Application, LLM API, Emotion Detection, Spiritual AI, Full Stack Development


## Introduction
Mental health and emotional well-being have become significant global concerns. Many individuals experience anxiety, stress, depression, and emotional confusion but hesitate to seek professional help due to stigma or accessibility issues.
Ancient scriptures like the Bhagavad Gita provide timeless wisdom promoting clarity, resilience, and inner strength. ShantiGPT bridges the gap between traditional spiritual wisdom and modern AI technology by delivering structured emotional guidance through a web-based platform.


## Problem Statement
Individuals frequently face emotional distress but lack access to structured, private, and culturally relevant guidance systems.
Existing AI chat platforms:
Provide unstructured responses
Lack domain-specific constraints
Do not use curated spiritual databases
Do not offer emotion-focused structured outputs
ShantiGPT addresses this by combining AI emotion detection with curated Bhagavad Gita mapping.


## Objectives
- Develop a full-stack MERN web application
- Implement LLM-based emotion classification
- Create a curated Bhagavad Gita shlok database
- Provide structured emotional guidance
- Enable anonymous usage
- Integrate emergency distress detection
- Demonstrate modular and scalable architecture


## Literature Review
AI-based conversational agents have been increasingly used for emotional and mental health support. Large Language Models (LLMs) demonstrate strong natural language understanding and emotion recognition capabilities.
However, most systems lack structured domain-specific knowledge retrieval. ShantiGPT adapts a constrained knowledge retrieval approach similar to Retrieval-Augmented Generation (RAG) systems, ensuring meaningful and relevant spiritual guidance.


## Proposed Methodology
User selects emotion or enters situation text.
Backend sends input to LLM API for emotion classification.
Emotion categorized into predefined classes:
- Anxiety
- Depression
- Stress
- Low Confidence
- Anger
- Confusion
Relevant shlok retrieved from MongoDB database.
Structured output generated:
- Shlok
- Meaning
- Practical Steps
- Daily Suggestion
Feedback stored for analytics.


## System Architecture
Shloksence follows a layered architecture:

### Presentation Layer
- React.js + Tailwind CSS
- Handles UI and user interaction.
### Application Layer
- Node.js + Express.js
- Manages APIs, emotion processing, and business logic.
### AI Processing Layer
- LLM API
- Performs emotion classification using structured prompting.
### Database Layer
MongoDB
Stores:
- Shlok database
- Feedback
- Community statistics


## Technology Stack
# Frontend
- React.js
- Tailwind CSS
# Backend
- Node.js
- Express.js
# Database
- MongoDB (Atlas)
- Mongoose ODM
# AI Integration
- LLM API (OpenAI / Gemini)
# Authentication
- JWT
- Bcrypt password hashing
# Deployment
- Render (Frontend)
- Render (Backend)


### Workflow
User Visits Website
        ↓
Select Emotion
        ↓
Describe Situation (Optional Anonymous)
        ↓
LLM Emotion Classification
        ↓
Shlok Retrieval from MongoDB
        ↓
Structured Response Display
        ↓
Feedback Collection


## Features
- AI-based emotion detection
- Curated Bhagavad Gita mapping
- Structured guidance output
- Anonymous mode
- Daily Shlok feature
- Community healing counter
- Feedback system
- Emergency distress detection


## Implementation Plan
# Phase 1
- Requirement analysis & database design
# Phase 2
- Backend development & AI integration
# Phase 3
- Frontend development
# Phase 4
- Testing & deployment


### Expected Results
- Accurate emotion detection
- Relevant spiritual guidance
- Structured and actionable responses
- Privacy-focused user experience
- Demonstration of MERN full-stack capability


### Limitations
- Dependent on LLM API accuracy
- Limited emotional categories
- Not a medical diagnostic system
- Requires internet connectivity


### Future Enhancements
- Multi-language support
- Mobile application version
- Advanced mood tracking dashboard
- AI personal growth tracker
- Counselor collaboration integration


### Ethical Considerations
- Not a substitute for medical treatment
- Emergency redirect for high-risk cases
- No public sharing of personal data
- Responsible AI usage policy


### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###

### Conclusion ###
Shloksence demonstrates the integration of Artificial Intelligence and traditional spiritual wisdom through a structured MERN stack web application. The project highlights full-stack development expertise, API integration, modular architecture, and ethical AI implementation.

### References
- T. Brown et al., “Language Models are Few-Shot Learners,” NeurIPS, 2020.
- J. Devlin et al., “BERT: Pre-training of Deep Bidirectional Transformers,” NAACL, 2019.
- OpenAI, “GPT-4 Technical Report,” 2023.
- M. Fowler, Patterns of Enterprise Application Architecture, 2002.
- Bhagavad Gita, Translated by Swami Sivananda, 1944.


