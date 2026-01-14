<x-mail::message>
# Welcome, {{ $user->name }}!

We are thrilled to welcome you to **DigiPro**. Your journey to creating a stunning professional portfolio starts here.

## What's Next?
You can now access your dashboard to start building your portfolio, adding projects, and showcasing your skills to the world.

<x-mail::button :url="route('dashboard')">
Go to Dashboard
</x-mail::button>

If you have any questions, our support team is always here to help.

Best regards,<br>
The {{ config('app.name') }} Team
</x-mail::message>
