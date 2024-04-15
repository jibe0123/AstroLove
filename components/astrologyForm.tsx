'use client'
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea'; // Ensure this is the correct import path
import { Button } from '@/components/ui/button'; // Ensure this is the correct import path
import Markdown from 'react-markdown';
import { Card } from '@/components/ui/card'; // Assuming Card is properly imported
import OpenAI from 'openai';
import Loader from "@/components/ui/loader";

const openai = new OpenAI({
    apiKey: 'lm-studio', // Ensure you handle your API key securely
    dangerouslyAllowBrowser: true,
    baseURL: "http://localhost:1234/v1"
});

function AstrologyForm() {
    const [content, setContent] = useState('');
    const [resultText, setResultText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchCompletion = async () => {
        setIsLoading(true);
        const completion = await openai.chat.completions.create({
            model: 'TheBloke/Mistral-7B-Instruct-v0.2-GGUF/mistral-7b-instruct-v0.2.Q2_K.gguf',
            messages: [
                {
                    role: "system",
                    content: "[INST] Vous êtes un médium spécialisé dans l'astrologie. Votre mission est de fournir une analyse astrologique complète et attrayante en utilisant des emojis quand nécessaire pour rendre les réponses plus engageantes. Répondez en français, incluez des sections sur l'amour, la carrière, et l'argent, et utilisez un ton serieux et empthique [/INST]"
                },
                {
                    role: "system",
                    content: "🌟 Bienvenue sur AstroCouple! 🌟 Pour débuter votre lecture astrologique personnalisée 📅, pouvez-vous me donner votre date, heure et lieu de naissance? 📍 Ces informations sont essentielles pour une analyse précise. 💫"
                },
                {
                    role: "user",
                    content: content
                },
                {
                    role: "system",
                    content: "[INST] Structurez votre réponse avec des titres emoji pour chaque section (amour, carrière, argent). Utilisez des listes à puces et des phrases courtes pour dynamiser le texte. Sautez des lignes si besoin. Commencez le texte directement sans faire part de l'input  Restez clair et professionnel mais avec un style convivial et positif. [/INST]"
                },
                {
                    role: "system",
                    content: "[INST]Donnez des anecodotes sur la ville de naissance a la fin pour rendre plus perosnnel l'echange[/INST]"
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        });
        if(completion.choices[0]?.message?.content) {
            console.log(completion)
            setResultText(completion.choices[0].message.content);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setResultText(''); // Clear previous results
        await fetchCompletion();
    };

    const handleKeyDown = async (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent the default action to avoid submitting the form multiple times
            await handleSubmit(e);
        }
    };

    const handleReset = () => {
        setContent('');
        setResultText('');
        setIsLoading(false);  // Optionally reset loading state as well
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <Card className=" bg-white p-4 shadow-md rounded-lg">
                {isLoading && <Loader />}
                {!isLoading && (<Markdown className="text-gray-800">
                    {resultText || "🌟 Bienvenue sur AstroCouple! 🌟 Pour débuter votre lecture astrologique personnalisée 📅, pouvez-vous me donner votre date, heure et lieu de naissance? 📍 Ces informations sont essentielles pour une analyse précise. 💫"}
                </Markdown>)}
            </Card>

            <form className="w-full fixed bottom-0 left-0 p-4 bg-white shadow-top-md">
                <Textarea
                    value={content}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered w-full mb-4"
                    placeholder="Tapez votre date de naissance pour connaitre votre astrologie"
                />
                <div className="flex justify-between">
                    <Button
                        onClick={handleSubmit}
                        className="btn btn-primary flex-1 mr-2">Submit</Button>
                    <Button onClick={handleReset}
                            variant="destructive"
                            className="btn  text-white px-2 py-1 flex-none">Reset</Button>
                </div>
            </form>
        </div>
    );
}

export default AstrologyForm;
