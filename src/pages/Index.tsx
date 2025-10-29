import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    contactType: 'email',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Добро пожаловать!',
        description: 'Вход выполнен успешно',
      });
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Регистрация успешна!',
        description: 'Ваш аккаунт создан',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Icon name="Wifi" size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Wi-Fi Портал</h1>
          <p className="text-muted-foreground">Подключитесь к нашей сети</p>
        </div>

        <Card className="shadow-xl border-2">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Вход
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Регистрация
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <CardTitle className="text-xl">Авторизация</CardTitle>
                  <CardDescription>Войдите в свой аккаунт для доступа к сети</CardDescription>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Icon name="Mail" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="ваш@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                        Вход...
                      </>
                    ) : (
                      <>
                        <Icon name="LogIn" className="mr-2" size={18} />
                        Войти
                      </>
                    )}
                  </Button>
                  <button type="button" className="text-sm text-primary hover:underline">
                    Забыли пароль?
                  </button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <CardTitle className="text-xl">Регистрация</CardTitle>
                  <CardDescription>Создайте аккаунт для доступа к Wi-Fi</CardDescription>

                  <div className="space-y-2">
                    <Label>Способ регистрации</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={registerData.contactType === 'email' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setRegisterData({ ...registerData, contactType: 'email', contact: '' })}
                      >
                        <Icon name="Mail" className="mr-2" size={18} />
                        Email
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.contactType === 'phone' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setRegisterData({ ...registerData, contactType: 'phone', contact: '' })}
                      >
                        <Icon name="Phone" className="mr-2" size={18} />
                        Телефон
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-contact">
                      {registerData.contactType === 'email' ? 'Email' : 'Телефон'}
                    </Label>
                    <div className="relative">
                      <Icon 
                        name={registerData.contactType === 'email' ? 'Mail' : 'Phone'} 
                        className="absolute left-3 top-3 text-muted-foreground" 
                        size={18} 
                      />
                      <Input
                        id="register-contact"
                        type={registerData.contactType === 'email' ? 'email' : 'tel'}
                        placeholder={registerData.contactType === 'email' ? 'ваш@email.com' : '+7 (999) 123-45-67'}
                        className="pl-10"
                        value={registerData.contact}
                        onChange={(e) => setRegisterData({ ...registerData, contact: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="register-confirm"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                        Регистрация...
                      </>
                    ) : (
                      <>
                        <Icon name="UserPlus" className="mr-2" size={18} />
                        Зарегистрироваться
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="Shield" size={16} />
            Защищённое соединение
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
