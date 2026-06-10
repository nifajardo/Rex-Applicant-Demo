import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, ArrowLeft } from 'lucide-react';
import ChangePasswordDialog from './ChangePasswordDialog';

const SettingsSection = ({ onLogout, onBack }) => {
  const { userEmail } = useAuth();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="change-password">Change Password</Label>
              <p className="text-sm text-muted-foreground">For security, we recommend changing your password periodically.</p>
            </div>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(true)}>Change</Button>
          </div>
           <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="delete-account">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
            </div>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>Log Out</Label>
              <p className="text-sm text-muted-foreground">Log out from your current session on this device.</p>
            </div>
            <Button variant="outline" onClick={onLogout}><LogOut className="w-4 h-4 mr-2" /> Log Out</Button>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        userEmail={userEmail}
      />

      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="theme-mode">Theme Mode</Label>
              <p className="text-sm text-muted-foreground">Choose between light and dark mode.</p>
            </div>
            <Select defaultValue="system">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Get real-time alerts on your device.</p>
            </div>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;