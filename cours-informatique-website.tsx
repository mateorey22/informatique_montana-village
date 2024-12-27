import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Home, Book, CreditCard, UserPlus } from 'lucide-react';

const WebsiteCours = () => {
  const initialFormData = {
    nom: '',
    adresse: '',
    telephone: '',
    email: '',
    dateNaissance: '',
    appareils: {
      ordinateurPortable: false,
      ordinateurBureau: false,
      tablette: false,
      smartphone: false,
      montreConnectee: false,
      televisionConnectee: false
    },
    niveauConnaissance: '',
    objectifs: {
      basesInformatique: false,
      navigationInternet: false,
      emails: false,
      reseauxSociaux: false,
      achatsEnLigne: false,
      demarchesAdmin: false,
      photosVideos: false,
      securite: false,
      communication: false
    },
    joursDisponibles: {
      lundi: false,
      mardi: false,
      mercredi: false,
      jeudi: false,
      vendredi: false
    },
    plageHoraire: '',
    frequence: '',
    connexionInternet: false,
    typeConnexion: '',
    remarques: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (section, field) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Cours d'Informatique Montana-Village</h1>
          <p className="text-xl mt-2">Restez connectés avec le monde d'aujourd'hui !</p>
        </div>
      </header>

      <nav className="bg-white shadow-lg">
        <div className="container mx-auto p-4">
          <Tabs defaultValue="inscription" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="accueil" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Accueil
              </TabsTrigger>
              <TabsTrigger value="inscription" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Inscription
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="tarifs" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Tarifs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inscription">
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-2xl">Formulaire d'inscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Informations Personnelles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nom">Nom et Prénom</Label>
                          <Input
                            id="nom"
                            value={formData.nom}
                            onChange={(e) => handleChange('nom', e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Appareils et Systèmes</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries({
                          ordinateurPortable: 'Ordinateur Portable',
                          ordinateurBureau: 'Ordinateur de Bureau',
                          tablette: 'Tablette',
                          smartphone: 'Smartphone',
                          montreConnectee: 'Montre Connectée',
                          televisionConnectee: 'Télévision Connectée'
                        }).map(([key, label]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={key}
                              checked={formData.appareils[key]}
                              onCheckedChange={() => handleCheckboxChange('appareils', key)}
                            />
                            <Label htmlFor={key}>{label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Niveau et Objectifs</h3>
                      <div>
                        <Label className="text-lg">Niveau de connaissance</Label>
                        <RadioGroup
                          value={formData.niveauConnaissance}
                          onValueChange={(value) => handleChange('niveauConnaissance', value)}
                          className="space-y-2"
                        >
                          {[
                            ['debutant', 'Grand débutant'],
                            ['intermediaire', 'Intermédiaire'],
                            ['avance', 'Avancé']
                          ].map(([value, label]) => (
                            <div className="flex items-center space-x-2" key={value}>
                              <RadioGroupItem value={value} id={value} />
                              <Label htmlFor={value}>{label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Disponibilités</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(formData.joursDisponibles).map(([jour, checked]) => (
                          <div key={jour} className="flex items-center space-x-2">
                            <Checkbox
                              id={jour}
                              checked={checked}
                              onCheckedChange={() => handleCheckboxChange('joursDisponibles', jour)}
                            />
                            <Label htmlFor={jour} className="capitalize">{jour}</Label>
                          </div>
                        ))}
                      </div>
                      <Select
                        value={formData.plageHoraire}
                        onValueChange={(value) => handleChange('plageHoraire', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir une plage horaire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="matin">Matin (8h-12h)</SelectItem>
                          <SelectItem value="aprem">Après-midi (13h-17h)</SelectItem>
                          <SelectItem value="soir">Soir (17h-19h)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Remarques additionnelles</h3>
                      <Textarea
                        value={formData.remarques}
                        onChange={(e) => handleChange('remarques', e.target.value)}
                        placeholder="Vos besoins spécifiques ou questions"
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button type="submit" className="w-full text-lg">
                      Envoyer ma demande d'inscription
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  );
};

export default WebsiteCours;
