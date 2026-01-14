<x-mail::message>
# Subscription Activated

Hi {{ $user->name }},

Thank you for subscribing to **DigiPro Premium**. Your subscription has been successfully activated.

You now have access to all premium features, including custom domains, advanced analytics, and more.

<x-mail::button :url="route('dashboard')">
Go to Dashboard
</x-mail::button>

If you have any questions or need assistance, feel free to contact our support team.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
