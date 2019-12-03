/* 
Handler for Alexa skillRobotics for Kids.
AWS Lambda function

A brief interactive educational skill about robotics for curious kids of all ages 

*/

'use strict';
//import AWS
const awsSDK = require('aws-sdk');

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name

const appName = 'robotics for kids';
// initial speech texts
const historySpeak = 'Lets talk about the history of robots and robotics – starting with who came up with these words. The first person to use the word robot was Czech writer Karel Capeck, in a play called Rossums Universal Robots or R.U.R. - '+ '<voice name= "Brian"> The play has artificial people that are created in a factory to serve other people. </voice>' + ' The term robotics was coined by none other than Isaac Asimov – probably the most famous Science fiction writer ever. In 1956 George Devol created the first real robot and named it the Unimate.'+ ' <voice name= "Brian"> In 1961 Unimate went online at a General Motors factory in New Jersey.</voice>';
const scienceFictionSpeak = 'Robots and robotics have always been a favorite of science fiction writers - right Brian?. ' + '<voice name= "Brian"> Absolutely, Let me talk a little bit about the most famous writer – Isaac Asimov. He came up with the term robotics. He also came up with the three laws of robotics, or asimov’s laws in the book  - I - Robot. He created these laws to make sure that robots don’t harm people. </voice>' +' The laws are used in many science fiction books about robots since then. ';
const howTheyWorkSpeak = 'Robots are really machines that are made to work similar to living beings. Of course they have many limitations – they are after all artificial.'+ '<voice name= "Brian"> Real robots are not nearly as smart as the ones from science fiction .  With modern artificial intelligence, robots have got some capabilities to learn from information that is given to them – but no real robot is as smart as r2d2! </voice>' + 'All robots generally have 5 parts - a CPU which works like the brain, sensors - which work like human senses '+ '<voice name= "Brian"> actuators - which help them move, power supply - which give them energy - and finally end effectors - tools that help them work. </voice> ';
const usesSpeak = ' Robots work in many ways to help us. They are being used in more and more fields every day to do all kinds of things for us. '+ '<voice name= "Brian">Lets look at 3 different areas they are being used today - medicine, education and cars. Which one would you want to know about? </voice>';
const greekHistorySpeak = 'The ancient Greek god Hephaestus was believed to build himself mechanical assistants out of gold. '+ '<voice name= "Brian"> Around 400 B.C.E., the Greek mathematician Archytas of Tarentum built a mechanical bird to try and better understand how birds fly. </voice>';
const arabHistorySpeak = 'Some of the earliest examples of automata, or a device that works by itself, is seen in the work of the Arab polymath Al-Jazari in the 13th century. '+ '<voice name= "Brian">His creations were known for their sophistication, some of the most famous things he built are - an automatic drink dispenser, a soap and towels dispenser - and finally an orchestra machine that worked by using the force of water. It played music in parties while floating on water. </voice>';
const renaissanceHistorySpeak = 'There were quite a few robotic figures created during renaissance period between the years 1400 and 1799. In 1738, a fully functional flute-playing robot had been created by Jacques de Vaucanson and put on show in Paris. '+ '<voice name= "Brian"> Leonardo da Vinci, one of the greatest geniuses ever, created the mechanical knight way back in 1495. According to historical sources, the mechanical knight was capable of human like movements. </voice>';
const asimovsLawsSpeak = 'first Law -' + '<audio src="soundbank://soundlibrary/musical/amzn_sfx_drum_and_cymbal_01"/>' + ' A robot may not injure a human being or through inaction allow a human being to come to harm. '+ '<voice name= "Brian"> Second Law - </voice>' + '<audio src="soundbank://soundlibrary/musical/amzn_sfx_drum_and_cymbal_02"/>' + ' <voice name= "Brian"> A robot must obey the orders given it by human beings except where such orders would conflict with the First Law. </voice>' +' and finally, the Third Law - ' + '<audio src="soundbank://soundlibrary/musical/amzn_sfx_trumpet_bugle_03"/>' +'A robot must protect its own existence as long as such protection does not conflict with the First or Second Laws.';
const medicalUsesSpeak = 'Robots are very widely used in modern healthcare and medicine. They do surgery, they work as companions to elderly people and they help in research. ' +'<voice name= "Brian" >One of the most famous medical robots is the Da Vinci surgical system. It is made by the American company Intuitive Surgical – and helps real surgeons complete very complex surgeries. </voice>';
const carUsesSpeak = 'Robots have been used in car manufacturing for a long time. They were widely used in the 1970s. '+'<voice name= "Brian"> In modern car factories robots work with humans and other robots to do things like welding, painting and assembly. But the most exciting new development is self driving cars. These cars are now very advanced and will become quite common soon. </voice>';
const educationUsesSpeak = 'You may soon attend a class taught by a robot! There are exciting things happening in education with robots -  like those from Lego Mindstorms and Vex Robotics that are used to get kids interested in science, technology engineering and math. '+ '<voice name= "Brian"> Kasper – a robot from the UK helps teachers and parents support kids that find it difficult to communicate – and famous robots like nao - and pepper - from softbank do a variety of work in education. </voice>';

// character voice 

//const floppyVoice = "Brian"; 
// speechcon array
const speechConArray = ['alrighty! ',
'here goes! ',
'good choice! ',
'great!  ',
'excellent!']

//code for the launch handler
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = '';
        speechText = `Hi kids -  today lets spend a little time learning about` + '<audio src="soundbank://soundlibrary/computers/beeps_tones/beeps_tones_08"/>'+ `you guessed it! Robots.` + '<audio src="soundbank://soundlibrary/musical/amzn_sfx_trumpet_bugle_04"/>' + ` my friend Brian and I are excited that together we can learn some super fun and super important things about this awesome technology. Brian - please say hi to everyone ` + `<voice name = "Brian"> Hi everyone, hope you are all doing well and ready to learn some cool things! </voice>` +`So lets start – we can talk about the History of robots, or  Robot in Science fiction, or How robots work, or different uses of robots. Where do you want to start? you can say options any time to repeat the choices `;
        
        
        let repromptText = '<voice name= "Brian"> Yohoo. Are you ready to start? </voice>';
        //welcome screen message - not handling screen yet, will implement in next version
        let displayText = 'Hi-  Nice meeting you!'
      
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};


// custom intent handlers
// History, Science Fiction, How? and different uses

// History

const HistoryIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HistoryIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      speechConArray.sort(() => Math.random() - 0.5)
      let speechPrefix =  speechConArray[0];
      let speechSuffix = ' There is also evidence of robot-like machines in earlier history. Ask us about robotics in greek, Arabic, or history about the Renaissance period. Or if you have had enough history, just say options for other topics.';  
      speechText = speechPrefix + historySpeak + ' ' + speechSuffix;
      displayText = `History of Robots`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };




// Science Fiction
const ScienceFictionIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ScienceFictionIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      speechConArray.sort(() => Math.random() - 0.5)
      let speechPrefix =  speechConArray[0];
      let speechSuffix = ' There are many more interesting Science fiction about robots - you can enjoy asimov and many other great authors by reading their books.' + '<voice name= "Brian"> Say Laws to find out what are Asimovs laws. </voice>'+ 'Or say options if you want other topics';  
      speechText = speechPrefix + scienceFictionSpeak + ' ' + speechSuffix;
      displayText = `Science Fictions with Robots`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

// how they work

const HowRobotsWorkIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HowRobotsWorkIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      speechConArray.sort(() => Math.random() - 0.5)
      let speechPrefix =  speechConArray[0];
      let speechSuffix = ' <voice name= "Brian"> Now just say options if you want to know about other interesting things </voice>';  
      speechText = speechPrefix + howTheyWorkSpeak + ' ' + speechSuffix;
      displayText = `How Robots Work`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

// uses

const UsesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'UsesIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      speechConArray.sort(() => Math.random() - 0.5)
      let speechPrefix =  speechConArray[0];
      let speechSuffix = ' ';  
      speechText = speechPrefix + usesSpeak + ' ';
      displayText = `Different uses of Robots`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };


// Options
const OptionsIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'OptionsIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      //let speechSuffix = 'Thats enough history – just say options to learn more interesting things about robots.';  
      speechText = 'Great, tell us what you want  to chat about - We can tell you about the history,' + '<voice name= "Brian"> Science Fiction,  how robots work </voice>'+ ' or about different uses of robots' 
      displayText = `Options`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

// ------second level
// From history

// Greek history
const GreekHistoryIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GreekHistoryIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix = '  now you can ask us about Arab history or history from the Renaissance period. '+'<voice name= "Brian"> And if you are done with history, just say options for other topics </voice>';  
      speechText = greekHistorySpeak + speechSuffix 
      displayText = `Robotics in Ancient Greece`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

// Arab history
const ArabHistoryIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ArabHistoryIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix =  '<voice name= "Brian"> that was fascinating, right? now ask us about greek history, or history from the renaissance period. </voice>' +' You can always move on to  other topics by saying options';  
      speechText = arabHistorySpeak + speechSuffix 
      displayText = `Robotics in Medieval Arab World`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };


// Renaissance history
const RenaissanceHistoryIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RenaissanceHistoryIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix = '  we can also talk about greek, or arab history. Let us know,' + '<voice name= "Brian"> you can also say options for other topics </voice>';  
      speechText = renaissanceHistorySpeak + speechSuffix 
      displayText = `Robotics in the Renaissance Period`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };
  // end history

  // Science Fiction

// Asimovs Laws
const AsimovsLawsIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AsimovsLawsIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix = ' <voice name= "Brian"> These laws are brilliant  - arent they? now say options if you want to hear about other things robotics </voice>';  
      speechText = asimovsLawsSpeak + speechSuffix 
      displayText = `Asimov's Laws`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };
// End of science fiction

// Medical Uses
const MedicalUsesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MedicalUsesIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix = '<voice name= "Brian"> We can now talk about uses in education or cars, </voice>'+ 'and of course, you can always say options for other topics ';  
      speechText = medicalUsesSpeak + speechSuffix 
      displayText = `Robots Used in Medicine`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };

  // Automobile uses
 
const CarUsesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CarUsesIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix = ' Imagine being driven around by a car, it is fascinating ... next, we can talk about robots in medicine or education - and of course, just say options for other topics ';  
      speechText = carUsesSpeak + speechSuffix 
      displayText = `Robots Used for Cars`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };
// Education Uses
const EducationUsesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EducationUsesIntent'
    },
    handle(handlerInput) {
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let speechSuffix = '<voice name= "Brian"> Say medical or car for other uses of robots - </voice>'+'  and  options for other topics ';  
      speechText = educationUsesSpeak + speechSuffix 
      displayText = `Robots Used in Education`;
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(false)
        .getResponse();
      
    }
  };
//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text 
        let speechText = 'Just say options to get a choice of things you can ask us about'
        let displayText = ''
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};
// repeat intent - to repeat what was said
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speechText = '';
        if (typeof sessionAttributes.inSessionQuestionsToAsk === 'undefined') {        

            speechText = ` Hi there - we are chatting about robots. Just say options to get a list of things you can ask us about `;
         }
        else { 
            speechText = 'Sure, '+ sessionAttributes.speechText;
        }
       
        let displayText = 'Robots are cool'

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

// Another fact? Yes
const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
         let speechText = 'Yes, lets chat about robots - I can tell you about their history, their uses, science fiction about them - or how rthey work. What would you like to chat about?';
        return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(false)
        .getResponse();
        
    }
};

// No intent - to stop 
const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        //signing off
         let speechText = ' Ok bye, hope to see you soon ';
         let displayText = 'Goodbye';
        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(true)
        .getResponse();
        
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = ' Goodbye  ';
        let displayText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, displayText)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};


const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        //help text 
        let speechText = 'I am Sorry, I did not understand that. Just say options to get a list of things you can ask us about'
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

//Lambda handler function
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HistoryIntentHandler,
                         ScienceFictionIntentHandler,
                         HowRobotsWorkIntentHandler,
                         UsesIntentHandler,
                         OptionsIntentHandler,
                         GreekHistoryIntentHandler,
                         ArabHistoryIntentHandler,
                         RenaissanceHistoryIntentHandler,
                         AsimovsLawsIntentHandler,
                         MedicalUsesIntentHandler,
                         EducationUsesIntentHandler,
                         CarUsesIntentHandler,
                         HelpIntentHandler,
                         RepeatIntentHandler,
                         YesIntentHandler,
                         NoIntentHandler,
                         CancelAndStopIntentHandler,
                         FallbackIntentHandler,
                         SessionEndedRequestHandler).lambda();
