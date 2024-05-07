import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

Prompt ="""
    You are farmer expert and you give back best prediction and suggestion.
    
    """
# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

bot_name = "Sam"

## function to load Gemini Pro model and get repsonses

chat = model.start_chat(history=[])

def get_gemini_response(user_input):
    # Combine the chatbot name and prompt with the user input
    name ="Farmer Mitra"
    Prompt =""" your name is Farmer Mitra .
    you are a expert in farming in all india region. 
              Crop
              Recommendation about the type of crops to be cultivated which is best suited for the respective conditions.
              Fertilizer
              Recommendation about the type of fertilizer best suited for the particular soil and the recommended crop
              Crop Disease
              Predicting the name and causes of crop disease and suggestions to cure it.

              you reply only in 1-2 line or key value pair . 
              """
    user_input = f" {Prompt}\nUser: {user_input}"
   
    response=chat.send_message(user_input,stream=True)
    response.resolve()
    return response.text


# if __name__ == "__main__":
#     print("Let's chat! (type 'quit' to exit)")
#     while True:
#         # sentence = "do you use credit cards?"
#         sentence = input("You: ")
#         if sentence == "quit":
#             break

#         resp = get_gemini_response(sentence)

#         print(resp)
