import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';

export interface UserFormData {
  client: string;
  archived: 'yes' | 'no';
  active: 'yes' | 'no';
  bringClientNumber: string;
  salutation: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  street: string;
  house: string;
  zip: string;
  city: string;
  country: string;
  paypal: string;
  notes: string;
  shipping: 'yes' | 'no';
  salesQuote: string;
  dob: string;
}

export function AddUserPage() {
  const { register, handleSubmit, control, reset } = useForm<UserFormData>({
    defaultValues: {
      archived: 'no',
      active: 'no',
      shipping: 'yes',
      salutation: 'Salutation',
      country: 'Country'
    }
  });

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      // Отправляем реальный запрос на DummyJSON
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // DummyJSON принимает любые данные, поэтому отправляем всю нашу форму
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании пользователя');
      }

      const newUser = await response.json();
      
      console.log('Ответ от сервера:', newUser);
      alert(`Супер! Пользователь ${newUser.firstName || data.lastName} успешно "создан" с ID: ${newUser.id}`);

      reset();
      
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке данных.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] p-6 lg:p-10">
      <div className="max-w-[1200px] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <span className="cursor-pointer hover:text-slate-600">User Managment</span>
          <span className="text-slate-300">{'>'}</span>
          <span className="text-slate-800 font-medium">List of Bringing Customers</span>
        </nav>

        <div className="bg-white rounded-[32px] shadow-sm p-8 lg:p-12 border border-slate-50">
          <h1 className="text-2xl font-semibold text-slate-500 mb-10">Add New User</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Client *</Label>
                <Controller
                  name="client"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="0000-0000-0000-0000"
                      placeholder="____-____-____-____"
                      className="flex h-12 w-full rounded-full border-none bg-slate-200 px-5 text-sm outline-none focus:ring-2 focus:ring-sky-100"
                      onAccept={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-slate-700">Archived</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                      <input type="radio" {...register('archived')} value="yes" className="w-4 h-4 accent-sky-500" /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                      <input type="radio" {...register('archived')} value="no" className="w-4 h-4 accent-sky-500" /> No
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-slate-700">Active</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                      <input type="radio" {...register('active')} value="yes" className="w-4 h-4 accent-sky-500" /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                      <input type="radio" {...register('active')} value="no" className="w-4 h-4 accent-sky-500" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Bring client number *</Label>
                <Input {...register('bringClientNumber')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="----" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Salutation</Label>
                <div className="relative">
                  <select {...register('salutation')} className="h-12 w-full bg-slate-200 border-none rounded-full px-5 appearance-none text-sm outline-none focus:ring-2 focus:ring-sky-100 text-slate-500">
                    <option value="Salutation" disabled>Salutation</option>
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Name *</Label>
                <Input {...register('lastName')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Name" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">First name</Label>
                <Input {...register('firstName')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Text" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Email address *</Label>
                <Input {...register('email')} type="email" className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Email address" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Mobile number</Label>
                <Input {...register('phone')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Mobile number" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Street *</Label>
                <Input {...register('street')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Street" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Number *</Label>
                <Input {...register('house')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Text" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">ZIP code *</Label>
                <Input {...register('zip')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="ZIP code (4-5 digits)" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">City *</Label>
                <Input {...register('city')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="City" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Country *</Label>
                <div className="relative">
                  <select {...register('country')} className="h-12 w-full bg-slate-200 border-none rounded-full px-5 appearance-none text-sm outline-none focus:ring-2 focus:ring-sky-100 text-slate-500">
                    <option value="Country" disabled>Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="PL">Poland</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Paypal account</Label>
                <Input {...register('paypal')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="Paypal account" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Notes</Label>
                <textarea 
                  {...register('notes')} 
                  className="w-full h-[150px] bg-slate-200 border-none rounded-[20px] p-5 outline-none focus:ring-2 focus:ring-sky-100 transition-all text-sm resize-none"
                  placeholder="Notes"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Shipping</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                    <input type="radio" {...register('shipping')} value="yes" className="w-4 h-4 accent-sky-500" /> Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                    <input type="radio" {...register('shipping')} value="no" className="w-4 h-4 accent-sky-500" /> No
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Sales quote</Label>
                <Input {...register('salesQuote')} className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100" placeholder="% 0" />
              </div>

              <div className="space-y-2">
                <Label className="text-[13px] font-semibold text-slate-700">Year of birth</Label>
                <div className="relative">
                  <Input 
                    type="date"
                    {...register('dob')} 
                    className="h-12 bg-slate-200 border-none rounded-full px-5 focus-visible:ring-2 focus-visible:ring-sky-100 w-full cursor-pointer text-slate-500" 
                  />

                </div>
              </div>

              <div className="mt-auto flex justify-end pt-8">
                <Button type="submit" className="bg-[#0ea5e9] hover:bg-sky-500 text-white font-medium h-12 px-10 rounded-full transition-all shadow-md">
                  Create User
                </Button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}