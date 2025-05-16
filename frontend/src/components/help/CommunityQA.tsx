
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  user: string;
  userAvatar?: string;
  title: string;
  content: string;
  date: string;
  answers: Answer[];
  upvotes: number;
}

interface Answer {
  id: string;
  user: string;
  userAvatar?: string;
  content: string;
  date: string;
  isAccepted: boolean;
}

const CommunityQA = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      user: "crypto_newbie",
      userAvatar: "https://source.unsplash.com/random/100x100/?portrait,1",
      title: "How do I know if my bid was successful?",
      content: "I've placed a few bids on different NFTs but I'm not sure if they're going through. Where can I check the status of my bids?",
      date: "2 days ago",
      upvotes: 5,
      answers: [
        {
          id: "a1",
          user: "zenthra_admin",
          userAvatar: "https://source.unsplash.com/random/100x100/?portrait,2",
          content: "You can check all your active bids in your Dashboard under the 'Participated Auctions' tab. If your bid is the highest, it will be highlighted. You'll also receive notifications about the status of your bids.",
          date: "1 day ago",
          isAccepted: true
        },
        {
          id: "a2",
          user: "nft_collector",
          userAvatar: "https://source.unsplash.com/random/100x100/?portrait,3",
          content: "Also, make sure your wallet is properly connected. Sometimes bids fail if there's a connection issue with your wallet.",
          date: "12 hours ago",
          isAccepted: false
        }
      ]
    },
    {
      id: "q2",
      user: "art_creator",
      userAvatar: "https://source.unsplash.com/random/100x100/?portrait,4",
      title: "Can I edit an NFT after it's been minted?",
      content: "I noticed a small error in the description of my NFT after minting it. Is there any way to edit the metadata or update the description?",
      date: "4 days ago",
      upvotes: 3,
      answers: [
        {
          id: "a3",
          user: "blockchain_dev",
          userAvatar: "https://source.unsplash.com/random/100x100/?portrait,5",
          content: "Once an NFT is minted, its core metadata (which includes the description) is permanently stored on the blockchain and cannot be altered. This is part of what makes NFTs verifiably unique. However, if the error is critical, you could contact Zenthra support to see if they can add a note to the display page.",
          date: "3 days ago",
          isAccepted: true
        }
      ]
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({ title: '', content: '' });
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>("q1");
  const [newAnswer, setNewAnswer] = useState({ questionId: '', content: '' });
  
  const { toast } = useToast();

  const handleUpvote = (questionId: string) => {
    setQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q)
    );
  };

  const handleAskQuestion = () => {
    if (newQuestion.title.trim() === '' || newQuestion.content.trim() === '') {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your question.",
        variant: "destructive"
      });
      return;
    }

    const newQuestionObj: Question = {
      id: `q${Date.now()}`,
      user: "current_user", // Would be replaced with actual user data
      title: newQuestion.title,
      content: newQuestion.content,
      date: "Just now",
      upvotes: 0,
      answers: []
    };

    setQuestions(prev => [newQuestionObj, ...prev]);
    setNewQuestion({ title: '', content: '' });
    setIsAskingQuestion(false);
    toast({
      title: "Question submitted",
      description: "Your question has been posted to the community."
    });
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (newAnswer.content.trim() === '') {
      toast({
        title: "Empty answer",
        description: "Please provide content for your answer.",
        variant: "destructive"
      });
      return;
    }

    const answerObj: Answer = {
      id: `a${Date.now()}`,
      user: "current_user", // Would be replaced with actual user data
      content: newAnswer.content,
      date: "Just now",
      isAccepted: false
    };

    setQuestions(prev => 
      prev.map(q => q.id === questionId ? {
        ...q,
        answers: [...q.answers, answerObj]
      } : q)
    );

    setNewAnswer({ questionId: '', content: '' });
    toast({
      title: "Answer submitted",
      description: "Your answer has been posted successfully."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Community Q&A</h2>
        <Button onClick={() => setIsAskingQuestion(true)} disabled={isAskingQuestion}>
          Ask a Question
        </Button>
      </div>

      {isAskingQuestion && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Question</CardTitle>
            <CardDescription>Ask the community for help with Zenthra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="question-title" className="text-sm font-medium block mb-1">
                  Title
                </label>
                <Input 
                  id="question-title" 
                  placeholder="What's your question about?"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="question-content" className="text-sm font-medium block mb-1">
                  Details
                </label>
                <Textarea 
                  id="question-content" 
                  placeholder="Provide details about your question..."
                  rows={4}
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAskingQuestion(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAskQuestion}>
                  Submit Question
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="cursor-pointer" onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}>
              <div className="flex justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{question.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {question.userAvatar ? (
                        <img src={question.userAvatar} alt={question.user} className="w-5 h-5 rounded-full" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-zenthra-purple/20"></div>
                      )}
                      <span>{question.user}</span>
                    </div>
                    <span>•</span>
                    <span>{question.date}</span>
                    <span>•</span>
                    <span>{question.answers.length} answer{question.answers.length !== 1 ? 's' : ''}</span>
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex gap-1 items-center"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleUpvote(question.id); 
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zenthra-purple">
                    <path d="M7.5 1L9.75 5.5L14.5 6.25L11 9.75L11.75 14.5L7.5 12.25L3.25 14.5L4 9.75L0.5 6.25L5.25 5.5L7.5 1Z" fill="currentColor" />
                  </svg>
                  <span>{question.upvotes}</span>
                </Button>
              </div>
            </CardHeader>

            {expandedQuestion === question.id && (
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-md mb-6">
                  <p>{question.content}</p>
                </div>

                <h4 className="font-medium mb-4">
                  {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
                </h4>

                {question.answers.map((answer) => (
                  <div key={answer.id} className={`p-4 mb-4 border rounded-md ${answer.isAccepted ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : ''}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {answer.userAvatar ? (
                        <img src={answer.userAvatar} alt={answer.user} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-zenthra-purple/20"></div>
                      )}
                      <span className="font-medium">{answer.user}</span>
                      <span className="text-muted-foreground text-sm">{answer.date}</span>
                      {answer.isAccepted && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                          Accepted Answer
                        </span>
                      )}
                    </div>
                    <p>{answer.content}</p>
                  </div>
                ))}

                <div className="mt-6">
                  <label htmlFor={`answer-${question.id}`} className="text-sm font-medium block mb-1">
                    Your Answer
                  </label>
                  <Textarea 
                    id={`answer-${question.id}`} 
                    placeholder="Share your knowledge or experience..."
                    rows={3}
                    value={newAnswer.questionId === question.id ? newAnswer.content : ''}
                    onChange={(e) => setNewAnswer({ questionId: question.id, content: e.target.value })}
                  />
                  <Button 
                    className="mt-2"
                    onClick={() => handleSubmitAnswer(question.id)}
                  >
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityQA;
