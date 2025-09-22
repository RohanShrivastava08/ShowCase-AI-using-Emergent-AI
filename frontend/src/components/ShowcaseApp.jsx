import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import { 
  Copy, Download, Eye, Github, ExternalLink, Sparkles, FileText, Globe, 
  Zap, Palette, MessageSquare, Wand2, CheckCircle, ArrowRight, Stars,
  Rocket, Code, Heart
} from 'lucide-react';
import { getMockShowcaseData } from '../services/mockData';

export default function ShowcaseApp() {
  const [formData, setFormData] = useState({
    repoUrl: '',
    projectDescription: '',
    demoUrl: '',
    tone: 'professional',
    tags: '',
    variations: 2,
    autoDetectTech: true
  });
  
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    // Add subtle fade-in animation on load
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.8s ease-in-out';
      document.body.style.opacity = '1';
    }, 100);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update active step based on input completion
    if (field === 'repoUrl' || field === 'projectDescription') {
      if (value && !activeStep > 1) setActiveStep(2);
    }
  };

  const handleGenerate = async () => {
    if (!formData.repoUrl && !formData.projectDescription) {
      toast({
        title: "🚨 Input Required",
        description: "Please provide either a GitHub repo URL or project description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setActiveStep(3);
    
    // Enhanced loading simulation with progress
    setTimeout(() => {
      const mockData = getMockShowcaseData(formData);
      setGeneratedContent(mockData);
      setIsLoading(false);
      setActiveStep(4);
      toast({
        title: "✨ Showcase Generated!",
        description: "Your professional content is ready for the world.",
      });
    }, 3000);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "📋 Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "⬇️ Downloaded!",
      description: `${filename} ready in your downloads.`,
    });
  };

  const toneIcons = {
    classy: <Palette className="w-4 h-4" />,
    professional: <Zap className="w-4 h-4" />,
    savage: <Rocket className="w-4 h-4" />,
    funny: <MessageSquare className="w-4 h-4" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Showcase.ai
                </h1>
                <p className="text-sm text-slate-600 font-medium">Transform • Showcase • Succeed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 font-semibold px-3 py-1">
                ✨ AI-Powered
              </Badge>
              <Badge variant="outline" className="border-indigo-200 text-indigo-600 font-medium">
                Beta
              </Badge>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-center space-x-8">
            {[
              { step: 1, label: 'Input', icon: Code },
              { step: 2, label: 'Customize', icon: Palette },
              { step: 3, label: 'Generate', icon: Wand2 },
              { step: 4, label: 'Export', icon: Download }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                  activeStep >= step 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {activeStep > step ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  activeStep >= step ? 'text-indigo-600' : 'text-slate-400'
                }`}>
                  {label}
                </span>
                {step < 4 && <ArrowRight className="w-4 h-4 text-slate-300" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-white/60 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  Project Input
                </CardTitle>
                <p className="text-slate-600">Share your project details to get started</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="repoUrl" className="text-slate-700 font-semibold flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Repository URL
                  </Label>
                  <Input
                    id="repoUrl"
                    placeholder="https://github.com/username/amazing-project"
                    value={formData.repoUrl}
                    onChange={(e) => handleInputChange('repoUrl', e.target.value)}
                    className="border-slate-300 focus:border-indigo-400 focus:ring-indigo-400 bg-white/50 transition-all duration-300"
                  />
                </div>

                <div className="relative flex items-center justify-center py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  </div>
                  <div className="relative bg-white px-4">
                    <span className="text-sm font-medium text-slate-500 bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">OR</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-slate-700 font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your amazing project in a few sentences..."
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    className="border-slate-300 focus:border-indigo-400 focus:ring-indigo-400 bg-white/50 transition-all duration-300 min-h-[100px]"
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="demoUrl" className="text-slate-700 font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Live Demo URL <span className="text-xs text-slate-500 font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="demoUrl"
                    placeholder="https://your-amazing-demo.vercel.app"
                    value={formData.demoUrl}
                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                    className="border-slate-300 focus:border-indigo-400 focus:ring-indigo-400 bg-white/50 transition-all duration-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/60 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  Customization
                </CardTitle>
                <p className="text-slate-600">Personalize your showcase style</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold">Tone & Voice</Label>
                    <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                      <SelectTrigger className="border-slate-300 bg-white/50">
                        <div className="flex items-center gap-2">
                          {toneIcons[formData.tone]}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classy">
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Classy & Elegant
                          </div>
                        </SelectItem>
                        <SelectItem value="professional">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Professional
                          </div>
                        </SelectItem>
                        <SelectItem value="savage">
                          <div className="flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Bold & Savage
                          </div>
                        </SelectItem>
                        <SelectItem value="funny">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Fun & Witty
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold">Variations</Label>
                    <Select value={formData.variations.toString()} onValueChange={(value) => handleInputChange('variations', parseInt(value))}>
                      <SelectTrigger className="border-slate-300 bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Caption</SelectItem>
                        <SelectItem value="2">2 Captions</SelectItem>
                        <SelectItem value="3">3 Captions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tags" className="text-slate-700 font-semibold flex items-center gap-2">
                    <Stars className="w-4 h-4" />
                    Tags & Mentions
                  </Label>
                  <Input
                    id="tags"
                    placeholder="React, TypeScript, AI, NextJS, Vercel"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="border-slate-300 focus:border-indigo-400 focus:ring-indigo-400 bg-white/50 transition-all duration-300"
                  />
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/50">
                  <Checkbox 
                    id="autoDetect" 
                    checked={formData.autoDetectTech}
                    onCheckedChange={(checked) => handleInputChange('autoDetectTech', checked)}
                    className="border-indigo-300"
                  />
                  <Label htmlFor="autoDetect" className="text-slate-700 font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-500" />
                    Auto-detect tech stack from repository
                  </Label>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-500 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      Crafting Your Showcase...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Wand2 className="w-5 h-5" />
                      Generate My Showcase
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3 space-y-8">
            {generatedContent ? (
              <Card className="border-white/60 shadow-2xl shadow-slate-200/60 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-slate-800">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    Your Professional Showcase
                  </CardTitle>
                  <p className="text-slate-600">Ready to share with the world</p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="linkedin" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 p-1">
                      <TabsTrigger value="linkedin" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn Posts
                      </TabsTrigger>
                      <TabsTrigger value="readme" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <FileText className="w-4 h-4" />
                        README.md
                      </TabsTrigger>
                      <TabsTrigger value="landing" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Globe className="w-4 h-4" />
                        Landing Page
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="linkedin" className="space-y-6 mt-6">
                      {generatedContent.linkedin_captions.map((caption, index) => (
                        <div key={index} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              Caption Variation {index + 1}
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(caption, 'LinkedIn Caption')}
                              className="flex items-center gap-2 hover:bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-300 transition-all duration-300"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </Button>
                          </div>
                          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200 shadow-inner">
                            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{caption}</pre>
                          </div>
                          {index < generatedContent.linkedin_captions.length - 1 && <Separator className="my-6" />}
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="readme" className="space-y-6 mt-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-emerald-600" />
                          Professional README.md
                        </h4>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generatedContent.readme_md, 'README')}
                            className="flex items-center gap-2 hover:bg-emerald-50 border-emerald-200 text-emerald-600 hover:border-emerald-300 transition-all duration-300"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(generatedContent.readme_md, 'README.md')}
                            className="flex items-center gap-2 hover:bg-indigo-50 border-indigo-200 text-indigo-600 hover:border-indigo-300 transition-all duration-300"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 max-h-96 overflow-y-auto shadow-inner">
                        <pre className="text-sm text-emerald-400 whitespace-pre-wrap font-mono leading-relaxed">{generatedContent.readme_md}</pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="landing" className="space-y-6 mt-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-purple-600" />
                          Professional Landing Page
                        </h4>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(generatedContent.landing_html, 'landing.html')}
                            className="flex items-center gap-2 hover:bg-purple-50 border-purple-200 text-purple-600 hover:border-purple-300 transition-all duration-300"
                          >
                            <Download className="w-3 h-3" />
                            Download HTML
                          </Button>
                        </div>
                      </div>
                      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg bg-white">
                        <iframe
                          srcDoc={generatedContent.landing_html}
                          className="w-full h-96"
                          title="Landing Page Preview"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-white/60 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <Wand2 className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        Ready to Create Magic?
                      </h3>
                      <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                        Fill out your project details and let our AI craft professional LinkedIn posts, a polished README, and a stunning landing page.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        LinkedIn Ready
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        GitHub Polish
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Landing Magic
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-white/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              <p className="text-slate-300">
                Crafted with passion using{' '}
                <span className="font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Showcase.ai
                </span>
              </p>
            </div>
            <p className="text-slate-400">
              Powered by{' '}
              <span className="font-semibold text-emerald-400">Outskill</span> &{' '}
              <span className="font-semibold text-indigo-400">Emergent</span>
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Made for Vercel
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Vite + React
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}