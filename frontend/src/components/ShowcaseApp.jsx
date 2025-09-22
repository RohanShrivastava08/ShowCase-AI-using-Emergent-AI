import React, { useState } from 'react';
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
import { Copy, Download, Eye, Github, ExternalLink, Sparkles, FileText, Globe } from 'lucide-react';
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
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.repoUrl && !formData.projectDescription) {
      toast({
        title: "Input Required",
        description: "Please provide either a GitHub repo URL or project description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockData = getMockShowcaseData(formData);
      setGeneratedContent(mockData);
      setIsLoading(false);
      toast({
        title: "Showcase Generated! ✨",
        description: "Your LinkedIn posts, README, and landing page are ready.",
      });
    }, 2000);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
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
      title: "Downloaded!",
      description: `${filename} has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Showcase.ai</h1>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
              Beta
            </Badge>
          </div>
          <p className="text-slate-600 mt-2">Transform your projects into professional showcases with AI</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Github className="w-5 h-5" />
                  Project Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repoUrl" className="text-slate-700">GitHub Repository URL</Label>
                  <Input
                    id="repoUrl"
                    placeholder="https://github.com/username/repo"
                    value={formData.repoUrl}
                    onChange={(e) => handleInputChange('repoUrl', e.target.value)}
                    className="border-slate-300 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <div className="flex-1 h-px bg-slate-300"></div>
                  <span className="text-sm">OR</span>
                  <div className="flex-1 h-px bg-slate-300"></div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="A brief description of your project..."
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    className="border-slate-300 focus:border-emerald-400 focus:ring-emerald-400"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoUrl" className="text-slate-700">Live Demo URL (Optional)</Label>
                  <Input
                    id="demoUrl"
                    placeholder="https://your-demo.com"
                    value={formData.demoUrl}
                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                    className="border-slate-300 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-800">Customization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Tone</Label>
                    <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classy">Classy</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="savage">Savage</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Variations</Label>
                    <Select value={formData.variations.toString()} onValueChange={(value) => handleInputChange('variations', parseInt(value))}>
                      <SelectTrigger className="border-slate-300">
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

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-slate-700">Tags / Mentions</Label>
                  <Input
                    id="tags"
                    placeholder="Outskill, Emergent, React, AI"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="border-slate-300 focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autoDetect" 
                    checked={formData.autoDetectTech}
                    onCheckedChange={(checked) => handleInputChange('autoDetectTech', checked)}
                  />
                  <Label htmlFor="autoDetect" className="text-slate-700">Auto-detect tech stack from repo</Label>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-2.5"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating Showcase...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate Showcase
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {generatedContent ? (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-slate-800">Generated Showcase</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="linkedin" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="linkedin" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn
                      </TabsTrigger>
                      <TabsTrigger value="readme" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        README
                      </TabsTrigger>
                      <TabsTrigger value="landing" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Landing
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="linkedin" className="space-y-4 mt-4">
                      {generatedContent.linkedin_captions.map((caption, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-slate-800">Caption {index + 1}</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(caption, 'LinkedIn Caption')}
                              className="flex items-center gap-2"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </Button>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">{caption}</pre>
                          </div>
                          {index < generatedContent.linkedin_captions.length - 1 && <Separator />}
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="readme" className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-800">README.md</h4>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generatedContent.readme_md, 'README')}
                            className="flex items-center gap-2"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(generatedContent.readme_md, 'README.md')}
                            className="flex items-center gap-2"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 max-h-96 overflow-y-auto">
                        <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">{generatedContent.readme_md}</pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="landing" className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-800">Landing Page</h4>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(generatedContent.landing_html, 'landing.html')}
                            className="flex items-center gap-2"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
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
              <div className="text-center py-12 text-slate-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Ready to Generate</h3>
                <p>Fill out the form and click "Generate Showcase" to create your LinkedIn posts, README, and landing page.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-600">
            Built with <span className="text-emerald-600 font-medium">Showcase.ai</span> • Powered by{' '}
            <span className="text-slate-800 font-medium">Outskill</span> &{' '}
            <span className="text-slate-800 font-medium">Emergent</span>
          </p>
        </div>
      </footer>
    </div>
  );
}